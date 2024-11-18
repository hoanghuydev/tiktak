class AvatarRepository {
    async createAvatar(data) {
        const { publicId, url, code } = data;
        return await db.Avatar.create({ publicId, url, code });
    }
    async updateAvatar(data, filter) {
        const { publicId, url, code } = data;
        return await db.Avatar.update(
            { publicId, url, code },
            {
                where: filter,
            }
        );
    }
    async deleteAvatar(filter) {
        return await db.Avatar.destroy({
            where: filter,
        });
    }
}
export default new AvatarRepository();
