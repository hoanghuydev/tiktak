import { Op } from 'sequelize';
import db from '../models';

class OtpRepository {
    async findOne(filter) {
        const { email, otp } = filter;
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
            force: true,
        });
    }
}

export default new OtpRepository();
