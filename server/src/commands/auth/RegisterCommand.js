import { Association } from 'sequelize';
import UserRepository from '../../repositories/UserRepository';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import * as otpGenerator from 'otp-generator';
import OtpRepository from '../../repositories/OtpRepository';
import { otpTemplateMail, sendMail } from '../../utils/MailUtil';
import CreateOtpCommand from '@commands/otp/CreateOtpCommand';
class RegisterCommand {
    async execute({ email, password, userName, fullName, association }) {
        if (!['facebook', 'google', 'github'].includes(association))
            throw createHttpError.BadRequest('Association not valid');
        const [user, created] = await UserRepository.findOrCreateUser({
            email,
            password: await bcrypt.hash(password, 10),
            userName,
            fullName,
            association: association,
        });
        if (!created)
            throw createHttpError.Conflict('Email or username already exists');
        // create otp code and send email
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
        });
        await CreateOtpCommand.execute({ email, otp });
        await sendMail(
            otpTemplateMail,
            'Verify your Tiktok account ',
            otp,
            email
        );
        const { password: _, ...other } = user.dataValues;
        return { user: other };
    }
}
export default new RegisterCommand();
