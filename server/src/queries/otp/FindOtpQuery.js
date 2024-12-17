import OtpRepository from '@repositories/OtpRepository';
class FindOtpQuery {
    async execute({ email, otp }) {
        const otpModel = await OtpRepository.findOne(email, otp);
        if (!otpModel) throw createHttpError.BadRequest('Otp is not valid');
        return otpModel;
    }
}
export default new FindOtpQuery().execute;
