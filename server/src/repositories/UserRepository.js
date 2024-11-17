import { Op } from 'sequelize';
import db from '../models';
import { formatQueryUserWithRoleAndAvatarData } from '../services/user';

class UserRepository {
    async findByEmailOrUsername(emailOrUsername) {
        return await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { userName: emailOrUsername },
                ],
                isVertified: true,
                association: '',
            },
            ...formatQueryUserWithRoleAndAvatarData(true),
        });
    }

    async findById(id) {
        return await db.User.findOne({
            where: { id },
            ...formatQueryUserWithRoleAndAvatarData(),
        });
    }

    async createUser(data) {
        return await db.User.create(data);
    }

    async updateUser(filter, email) {
        return await db.User.update(filter, { where: { email } });
    }

    async findOrCreateUser(data) {
        return await db.User.findOrCreate({
            where: {
                [Op.or]: [{ email: data.email }, { userName: data.userName }],
            },
            defaults: data,
        });
    }
}

export default new UserRepository();
