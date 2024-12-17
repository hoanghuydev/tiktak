// controllers/AuthController.js
import TokenService from '@services/TokenService';
import OauthService from '@services/OAuthService';
import UserRepository from '@repositories/UserRepository';
import createError from 'http-errors';
import { validateSchema } from '@utils/validateUtil';
import {
    loginSchema,
    registerSchema,
    verifySchema,
} from '@validators/authValidator';
import AuthService from '@services/AuthService';

class AuthController {
    async register(req, res, next) {
        try {
            await validateSchema(registerSchema, req.body, res, next);
            const { email, fullName, userName, password, association } =
                req.body;
            const { user } = await AuthService.register({
                email,
                fullName,
                userName,
                password,
                association,
            });
            return res.status(200).json({
                err: 0,
                mes: 'Register user successfully',
                user,
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyAccount(req, res, next) {
        try {
            await validateSchema(verifySchema, req.body, res, next);
            const { email, otp } = req.body;
            await AuthService.verifyAccount({
                email,
                otp,
            });
            return res.status(200).json({
                err: 0,
                mes: 'Verified account, now you available to login',
            });
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            await validateSchema(loginSchema, req.body, res, next);
            const { emailOrUsername, password } = req.body;
            const { user, accessToken, refreshToken } = await AuthService.login(
                {
                    emailOrUsername,
                    password,
                }
            );
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });
            return response.status(200).json({
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
            await AuthService.logout(req.user);
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
            const { refreshToken } = await OauthService.handleOAuth2(user);

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
            const { user, refreshToken, accessToken } =
                await AuthService.loginSuccess(req.cookies.refreshToken);

            // Gửi refresh token mới qua cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });
            return res.status(200).json({
                err: 0,
                mes: 'Successfully',
                accessToken,
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
