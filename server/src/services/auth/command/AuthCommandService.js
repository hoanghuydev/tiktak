import createError from 'http-errors';
import otpGenerator from 'otp-generator';
import OtpRepository from '../../../repositories/OtpRepository';
import UserRepository from '../../../repositories/UserRepository';

class AuthCommandSevice {
    async register({ email, fullName, userName, password, association }) {
        // Tạo người dùng
        const [user, created] = await UserRepository.findOrCreateUser({
            email,
            fullName,
            userName,
            password: await bcrypt.hash(password, 10),
            association: association || '',
        });

        if (!created) {
            throw createError.Conflict('Email or username already exists');
        }

        // Tạo OTP
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
        });
        await OtpRepository.createOtp({ email, otp });

        // Gửi email OTP
        // await sendMail(
        //     otpTemplateMail,
        //     'OTP Mail',
        //     `Your OTP is ${otp}`,
        //     email
        // );

        // Trả về kết quả
        const { password: _, ...other } = user.dataValues;
        return {
            mes: 'Registered successfully, Your OTP has been sent to email address. OTP will be expired in 5 minutes',
            user: { other },
        };
    }
    async verifyAccount({ email, otp }) {
        const otpRecord = await OtpRepository.findByEmailAndOtp(email, otp);
        if (!otpRecord) {
            throw createError.BadRequest('OTP is not valid or expired');
        }

        const createdAt = new Date(otpRecord.createdAt).getTime();
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        if (now - createdAt > fiveMinutes) {
            throw createError.BadRequest('OTP has expired');
        }

        // Cập nhật trạng thái xác thực người dùng
        const isUpdated = await UserRepository.updateUser(
            { isVertified: true },
            { email }
        );
        if (!isUpdated)
            throw createError.BadRequest('Error when updating user');

        // Xóa OTP sau khi xác thực
        await OtpRepository.deleteOtp(email, otp);

        return { mes: 'Verified successfully, now you can login' };
    }
}
export default new AuthCommandSevice();
