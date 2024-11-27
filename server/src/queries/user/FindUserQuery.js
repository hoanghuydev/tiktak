const createHttpError = require('http-errors');
const {
    default: UserRepository,
} = require('../../repositories/UserRepository');

class FindUserQuery {
    async execute(userFilter) {
        const user = await UserRepository.findOne(userFilter);
        if (!user) throw createHttpError.BadRequest('User not found');
        return user;
    }
}

export default new FindUserQuery();
