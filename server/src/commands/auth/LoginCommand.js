import createHttpError from 'http-errors';
import UserRepository from '../../repositories/UserRepository';
import bcrypt from 'bcrypt';
import FindUserByEmailOrUsernameQuery from '../../queries/user/FindUserByEmailOrUsernameQuery';
class LoginCommand {
    async execute({ emailOrUsername, password }) {
        const user = await FindUserByEmailOrUsernameQuery(emailOrUsername);
        const isValidPassword = await bcrypt.compare(user.password, password);
        if (!isValidPassword)
            throw createHttpError.BadRequest('Password is incorrect');
        const { password: _, ...other } = user.dataValues;
        return { user: other };
    }
}

export default new LoginCommand();
