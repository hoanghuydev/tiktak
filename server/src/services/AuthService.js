// services/authService.js
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import createError from 'http-errors';
import UserRepository from '../repositories/UserRepository';
import OtpRepository from '@repositories/OtpRepository';
import { otpTemplateMail } from '@utils/MailUtil';
import FindUserByEmailOrUsernameQuery from '@queries/user/FindUserByEmailOrUsernameQuery';
import FindUserQuery from '@queries/user/FindUserQuery';
import MailService from '@services/MailService';
import CreateOtpCommand from '../commands/otp/CreateOtpCommand';
import FindOtpQuery from '../queries/otp/FindOtpQuery';
import UpdateUserCommand from '../commands/user/UpdateUserCommand';
import DeleteOtpCommand from '../commands/otp/DeleteOtpCommand';

class AuthService {
    async register({ email, fullName, userName, password, association }) {
        // Tạo người dùng
        const user = await FindUserQuery({ email, userName });
        if (user) {
            throw createError.Conflict('Email or username already exists');
        }
        const otpModel = await CreateOtpCommand(email);

        await MailService.sendMail({
            template: otpTemplateMail,
            title: 'OTP Mail',
            content: `Your OTP is ${otpModel.otp}`,
            email,
        });

        const { password: _, ...other } = user;
        return {
            user: { other },
        };
    }

    async verifyAccount({ email, otp }) {
        const otpRecord = await FindOtpQuery({ email, otp });

        const createdAt = new Date(otpRecord.createdAt).getTime();
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        if (now - createdAt > fiveMinutes) {
            throw createError.BadRequest('OTP has expired');
        }

        // Cập nhật trạng thái xác thực người dùng
        await UpdateUserCommand({ isVerified: true }, { email });

        // Xóa OTP sau khi xác thực
        await DeleteOtpCommand({ email, otp });

        return true;
    }

    async login({ emailOrUsername, password }) {
        const userInfo = await FindUserByEmailOrUsernameQuery(emailOrUsername);
        const isValidPassword = await bcrypt.compare(
            userInfo.password,
            password
        );
        if (!isValidPassword)
            throw createHttpError.BadRequest('Password is incorrect');

        const { password: _, ...other } = userInfo.dataValues;

        const accessToken = await TokenService.generateAccessToken(user);
        const refreshToken = await TokenService.generateRefreshToken(user);

        return { user: other, accessToken, refreshToken };
    }
    async logout(user) {
        if (!user) throw createError.Unauthorized('You have not logged in yet');
        await TokenService.removeRefreshTokenFromRedis(user.id);
    }
    async loginSuccess(refreshToken) {
        if (!refreshToken)
            throw createError.Unauthorized("You're not authenticated");
        const decoded = await TokenService.verifyToken(refreshToken);
        const user = await FindUserQuery({ id: decoded.id });
        const storedToken = await TokenService.getStoredRefreshToken(user.id);
        if (storedToken !== refreshToken)
            throw createError.Unauthorized('Refresh token is not valid');
        const newAccessToken = TokenService.generateAccessToken(user);
        const newRefreshToken = TokenService.generateRefreshToken(user);
        return {
            user,
            refreshToken: newRefreshToken,
            accessToken: newAccessToken,
        };
    }
}
export default new AuthService();
