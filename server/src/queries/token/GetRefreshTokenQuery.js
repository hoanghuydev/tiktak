import RedisStorage from '../../storages/redis/RedisStorage';

class GetRefreshTokenQuery {
    async execute(userId) {
        const key = `refreshToken:userId:${userId}`;
        return await RedisStorage.get(key);
    }
}
export default new GetRefreshTokenQuery().execute;
