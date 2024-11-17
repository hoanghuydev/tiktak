// controllers/AuthController.js
import authService from '../services/AuthService';
import tokenService from '../services/TokenService';
import oauthService from '../services/OAuthService';
import userRepository from '../repositories/UserRepository';
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
            const response = await authService.register({
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
            const response = await authService.verifyAccount({ email, otp });
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
            const { user } = await authService.login({
                emailOrUsername,
                password,
            });

            // Tạo token
            const accessToken = tokenService.generateAccessToken(user);
            const refreshToken = tokenService.generateRefreshToken(user);

            // Lưu refresh token vào Redis
            await tokenService.setRefreshTokenToRedis(refreshToken, user.id);

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
                await tokenService.removeRefreshTokenFromRedis(user.id);
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
            const refreshToken = await oauthService.handleOAuth2(user);

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
            const decoded = await tokenService.verifyToken(refreshToken);
            const user = await userRepository.findById(decoded.id);

            if (!user) {
                throw createError.Unauthorized('User not found');
            }

            const storedToken = await tokenService.getStoredRefreshToken(
                user.id
            );

            if (storedToken !== refreshToken) {
                throw createError.Unauthorized('Refresh token is not valid');
            }

            // Tạo token mới
            const newAccessToken = tokenService.generateAccessToken(user);
            const newRefreshToken = tokenService.generateRefreshToken(user);

            // Cập nhật refresh token trong Redis
            await tokenService.removeRefreshTokenFromRedis(user.id);
            await tokenService.setRefreshTokenToRedis(newRefreshToken, user.id);

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
