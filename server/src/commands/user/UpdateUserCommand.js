import UserRepository from '../../repositories/UserRepository';

class UpdateUserCommand {
    async execute(userData, userFilter) {
        return await UserRepository.updateUser(userData, userFilter);
    }
}
export default new UpdateUserCommand().execute;
