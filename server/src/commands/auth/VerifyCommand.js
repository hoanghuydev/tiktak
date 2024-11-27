import UserRepository from '../../repositories/UserRepository';
import OtpRepository from '../../repositories/OtpRepository';
import createHttpError from 'http-errors';
import FindOtpQuery from '@queries/FindOtpQuery';
class VerifyCommand {
    async execute({ email, otp }) {
        const otpRecord = await FindOtpQuery.execute({ email, otp });
        const createdAt = new Date(otpRecord.createdAt).getTime();
        const fiveMinutes = 5 * 60 * 1000;
        const now = new Date.now();
        if (now - createdAt > fiveMinutes)
            throw new createHttpError.BadRequest('OTP has expried');
        await UserRepository.updateUser({ isVerified: true });
        await OtpRepository.deleteOtp(email, otp);
        return true;
    }
}
export default new VerifyCommand();
