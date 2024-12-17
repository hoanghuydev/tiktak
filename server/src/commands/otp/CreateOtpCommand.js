import OtpRepository from '../../repositories/OtpRepository';
import createHttpError from 'http-errors';
import otpGenerator from 'otp-generator';

class CreateOtpCommand {
    async execute(email) {
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
        });
        const otpCreated = await OtpRepository.createOtp({ email, otp });
        if (!otpCreated)
            throw createHttpError.BadRequest('Error when create otp');
        return otpCreated;
    }
}
export default new CreateOtpCommand().execute;
