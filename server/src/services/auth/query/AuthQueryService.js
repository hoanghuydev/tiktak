import createError from 'http-errors';
import bcrypt from 'bcrypt';
import UserRepository from '../../../repositories/UserRepository';
class AuthQueryService {
    async login({ emailOrUsername, password }) {
        const user = await UserRepository.findByEmailOrUsername(
            emailOrUsername
        );
        if (!user) {
            throw createError.NotFound(
                'Account not found or not yet verified.'
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw createError.BadRequest('Password is incorrect');
        }
        const { password: _, ...other } = user.dataValues;

        return { user: other };
    }
}
export default new AuthQueryService();
