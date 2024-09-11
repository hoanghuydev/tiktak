import { sequelize } from '../models';
import * as authServices from '../services/auth';
import * as otpServices from '../services/otp';
import * as userServices from '../services/user';
const otpGenerator = require('otp-generator');
const fs = require('fs');
const path = require('path');
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { otpTemplateMail, sendMail } from '../utils/MailUtil';
import {
    alreadyExistRow,
    badRequest,
    forBidden,
    internalServerError,
    notFound,
    unauthorized,
} from '../utils/handleResp';
import client from '../config/db/redis';
let refreshTokenList = [];
class AuthController {
    generateAccessToken = (user) => {
        const privateKeyPath = path.join(__dirname, '..', 'key', 'private.pem');
        const privateKey = fs.readFileSync(privateKeyPath);
        return (
            'Bearer ' +
            jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    roleValue: user.roleData.value,
                },
                privateKey,
                { expiresIn: '2d', algorithm: 'RS256' }
            )
        );
    };
    generateRefreshToken = (user) => {
        const privateKeyPath = path.join(__dirname, '..', 'key', 'private.pem');
        const privateKey = fs.readFileSync(privateKeyPath);
        return (
            'Bearer ' +
            jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    roleValue: user.roleData.value,
                },
                privateKey,
                { expiresIn: '365d', algorithm: 'RS256' }
            )
        );
    };
    refreshNewToken = async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return forBidden("You're not authenticated", res);
            }
            try {
                const userId = await jwt.verify(
                    refreshToken.replace('Bearer ', ''),
                    fs.readFileSync(
                        path.join(__dirname, '..', 'key', 'publickey.crt')
                    ),
                    { algorithms: ['RS256'] }
                ).id;
                const user = await userServices.findOne({ id: userId });
                user.password = '';
                const storedToken = await client.get(String(user.id));
                if (storedToken == null || storedToken != refreshToken) {
                    return unauthorized('Refresh token is not valid', res);
                }

                const newAccessToken = new AuthController().generateAccessToken(
                    user
                );
                const newRefreshToken =
                    new AuthController().generateRefreshToken(user);

                await new AuthController().removeRefreshTokenFromRedis(user.id);
                await new AuthController().setRefreshTokenToRedis(
                    newRefreshToken,
                    user.id
                );

                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                });

                return res.status(200).json({
                    err: 0,
                    mes: 'Successfully',
                    accessToken: newAccessToken,
                    user: user,
                });
            } catch (err) {
                console.error(err);
                return forBidden('Refresh token is not valid', res);
            }
        } catch (err) {
            console.error(err);
            return internalServerError(res);
        }
    };
    setRefreshTokenToRedis = (token, userId) => {
        return new Promise(async (resolve, reject) => {
            await client.set(
                String(userId),
                token,
                {
                    EX: 356 * 24 * 60 * 60,
                },
                (err, reply) => {
                    if (err) {
                        return reject(err);
                    }
                }
            );
            resolve(true);
        });
    };
    removeRefreshTokenFromRedis = (userId) => {
        return new Promise(async (resolve, reject) => {
            await client.del(String(userId), (err, reply) => {
                if (err) {
                    return reject(err);
                }
            });
            resolve(true);
        });
    };
    async register(req, res) {
        try {
            let { email, fullName, userName, password, association } = req.body;
            association = association ? association : '';
            if (!email || !fullName || !userName || !password)
                return badRequest('Please fill all required', res);
            if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email))
                return badRequest('Please enter a valid email address', res);
            const resp = await authServices.register(
                email,
                fullName,
                userName,
                password,
                association,
                false
            );
            if (resp[1]) {
                const otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    specialChars: false,
                    digits: true,
                });
                const createOTP = await otpServices.createOTP(email, otp);
                console.log(otp);
                sendMail(
                    otpTemplateMail,
                    'OTP Mail',
                    'Your otp is ' + otp,
                    email
                );
                const user = resp[0];
                user.password = '';
                return res.status(200).json({
                    err: 0,
                    mes: 'Registered successfully, Your otp has been sent to email address. OTP will be expired in 5 minutes',
                    user,
                });
            } else {
                return alreadyExistRow(
                    'Email already exists or account not vertify',
                    res
                );
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async vertifyAccount(req, res) {
        try {
            const { email, otp } = req.body;
            const resp = await authServices.vertifyAccount(email, otp);
            const createdAt = new Date(resp.createdAt).getTime();
            const now = new Date().getTime();
            const fiveMinutes = 5 * 60 * 1000;
            if (resp == null) {
                return badRequest('OTP is not valid', res);
            }
            if (now - createdAt > fiveMinutes)
                return badRequest('OTP has expired', res);
            const updateUser = await userServices.updateUser(
                {
                    isVertified: true,
                },
                email
            );
            otpServices.deleteOTP({ email, otp });
            return res.status(200).json({
                err: 0,
                mes: 'Verified successfully, now you can login',
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async OAuth2(req, res) {
        try {
            const user = req.user;
            const refreshToken = new AuthController().generateRefreshToken(
                user
            );
            await new AuthController().setRefreshTokenToRedis(
                refreshToken,
                user.id
            );
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
            });
            return res.redirect(
                process.env.URL_CLIENT + `/login?action=loginSuccess`
            );
        } catch (error) {
            return res.redirect(
                process.env.URL_CLIENT + `/login?action=loginSuccess`
            );
        }
    }
    async loginSuccess(req, res) {
        new AuthController().refreshNewToken(req, res);
    }
    async login(req, res) {
        try {
            const { emailOrUsername, password } = req.body;
            if (!emailOrUsername && !password)
                return badRequest('Please fill all required', res);
            let user = await authServices.login(emailOrUsername);
            if (user == null)
                return notFound('Account not found or not yet verified.', res);
            const validatePassword = bcrypt.compareSync(
                password,
                user.password
            );
            if (!validatePassword)
                return badRequest('Password is incorrect', res);
            user.password = '';
            const accessToken = new AuthController().generateAccessToken(user);
            const refreshToken = new AuthController().generateRefreshToken(
                user
            );
            await new AuthController().setRefreshTokenToRedis(
                refreshToken,
                user.id
            );
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
            });
            return res.status(200).json({
                err: 0,
                mes: 'Login successful',
                user,
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async logout(req, res) {
        const user = req.user;
        await new AuthController().removeRefreshTokenFromRedis(user.id);
        res.clearCookie('refreshToken');
        req.user = null;
        return res.status(200).json({
            err: 0,
            mes: 'Logout successful',
        });
    }
    async refreshToken(req, res) {
        new AuthController().refreshNewToken(req, res);
    }
}
export default new AuthController();
