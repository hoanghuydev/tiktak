import UserRepository from '../../repositories/UserRepository';
import createHttpError from 'http-errors';
class CreateOtpCommand {
    async execute({ email, otp }) {
        const otpCreated = await UserRepository.createOtp({ email, otp });
        if (!otpCreated)
            throw createHttpError.BadRequest('Error when create otp');
        return otpCreated;
    }
}
export default new CreateOtpCommand();
