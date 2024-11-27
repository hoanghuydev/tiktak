import AbstractRepository from '@repositories/AbstractRepository';
import db from '@models'; // Sequelize models

class AvatarRepository extends AbstractRepository {
    constructor() {
        super(db.Avatar);
    }

    async createAvatar(data) {
        const { publicId, url, code } = data;
        return await this.model.create({ publicId, url, code });
    }

    async updateAvatar(data, filter) {
        const { publicId, url, code } = data;
        return await this.model.update(
            { publicId, url, code },
            { where: filter }
        );
    }

    async deleteAvatar(filter) {
        return await this.model.destroy({ where: filter });
    }
}

export default new AvatarRepository();
