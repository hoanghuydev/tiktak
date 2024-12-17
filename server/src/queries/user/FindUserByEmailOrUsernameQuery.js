const createHttpError = require('http-errors');
const {
    default: UserRepository,
} = require('../../repositories/UserRepository');

class FindUserByEmailOrUsernameQuery {
    async execute(emailOrUsername) {
        const user = await UserRepository.findByEmailOrUsername(
            emailOrUsername
        );
        if (!user) throw createHttpError.BadRequest('Not found user');
        return user;
    }
}
export default new FindUserByEmailOrUsernameQuery().execute;
