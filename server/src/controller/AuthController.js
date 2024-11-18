// controllers/AuthController.js
import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';
import OauthService from '../services/OAuthService';
import UserRepository from '../repositories/UserRepository';
import createError from 'http-errors';
import { validateSchema } from '../utils/validateUtil';
import {
    loginSchema,
    registerSchema,
    verifySchema,
} from '../validators/authValidator';

class AuthController {
    async register(req, res, next) {
        try {
            await validateSchema(registerSchema, req.body, res, next);
            const { email, fullName, userName, password, association } =
                req.body;
            const response = await AuthService.register({
                email,
                fullName,
                userName,
                password,
                association,
            });
            return res.status(200).json({
                err: 0,
                mes: response.message,
                user: response.user,
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyAccount(req, res, next) {
        try {
            await validateSchema(verifySchema, req.body, res, next);
            const { email, otp } = req.body;
            const response = await AuthService.verifyAccount({ email, otp });
            return res.status(200).json({
                err: 0,
                mes: response.message,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            await validateSchema(loginSchema, req.body, res, next);
            const { emailOrUsername, password } = req.body;
            const { user } = await AuthService.login({
                emailOrUsername,
                password,
            });

            // Tạo token
            const accessToken = TokenService.generateAccessToken(user);
            const refreshToken = TokenService.generateRefreshToken(user);

            // Lưu refresh token vào Redis
            await TokenService.setRefreshTokenToRedis(refreshToken, user.id);

            // Gửi refresh token qua cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });

            return res.status(200).json({
                err: 0,
                mes: 'Login successful',
                user,
                accessToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const user = req.user;
            if (user) {
                await TokenService.removeRefreshTokenFromRedis(user.id);
            }
            res.clearCookie('refreshToken');
            return res.status(200).json({
                err: 0,
                mes: 'Logout successful',
            });
        } catch (error) {
            next(error);
        }
    }

    async OAuth2(req, res, next) {
        try {
            const user = req.user;
            const refreshToken = await OauthService.handleOAuth2(user);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });

            return res.redirect(
                `${process.env.URL_CLIENT}/login?action=loginSuccess`
            );
        } catch (error) {
            return res.redirect(
                `${process.env.URL_CLIENT}/login?action=loginSuccess`
            );
        }
    }

    async loginSuccess(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                throw createError.Unauthorized("You're not authenticated");
            }
            // Xác thực refresh token
            const decoded = await TokenService.verifyToken(refreshToken);
            const user = await UserRepository.findById(decoded.id);
            if (!user) throw createError.Unauthorized('User not found');
            const storedToken = await TokenService.getStoredRefreshToken(
                user.id
            );
            if (storedToken !== refreshToken)
                throw createError.Unauthorized('Refresh token is not valid');
            // Tạo token mới
            const newAccessToken = TokenService.generateAccessToken(user);
            const newRefreshToken = TokenService.generateRefreshToken(user);
            // Cập nhật refresh token trong Redis
            await TokenService.removeRefreshTokenFromRedis(user.id);
            await TokenService.setRefreshTokenToRedis(newRefreshToken, user.id);
            // Gửi refresh token mới qua cookie
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });
            return res.status(200).json({
                err: 0,
                mes: 'Successfully',
                accessToken: newAccessToken,
                user,
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        this.loginSuccess(req, res, next);
    }
}

export default new AuthController();
