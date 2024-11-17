import { Op } from 'sequelize';
import db from '../models';

class OtpRepository {
    async findByEmailAndOtp(email, otp) {
        return await db.Otp.findOne({
            where: {
                [Op.and]: [{ email }, { otp }],
            },
        });
    }

    async createOtp(data) {
        return await db.Otp.create(data);
    }

    async deleteOtp(email, otp) {
        return await db.Otp.destroy({
            where: { email, otp },
        });
    }
}

export default new OtpRepository();
