class DeleteRefreshToken {
    async execute(userId) {
        const key = `refreshToken:userId:${userId}`;
        return await RedisStorage.delete(key);
    }
}
export default new DeleteRefreshToken().execute;
