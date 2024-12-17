import OtpRepository from '../../repositories/OtpRepository';

class DeleteOtpCommand {
    async execute({ email, otp }) {
        return await OtpRepository.deleteOtp(email, otp);
    }
}
export default new DeleteOtpCommand().execute;
