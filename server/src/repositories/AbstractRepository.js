import { where } from 'sequelize';

class AbstractRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }
    async update(data, filter) {
        return await this.model.update(data, { where: filter });
    }
    async findOne(filter) {
        return await this.model.findOne({
            where: filter,
        });
    }
    async delete(filter) {
        return await this.model.destroy({
            where: filter,
        });
    }
    async hardDelete(filter) {
        return await this.model.destroy({
            where: filter,
            force: true,
        });
    }
}

export default AbstractRepository;
