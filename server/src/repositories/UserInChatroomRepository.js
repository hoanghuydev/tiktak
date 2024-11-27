import { literal, Op, where } from 'sequelize';
import db from '../models';
import { paginationResponse, pagingConfig } from '../utils/pagination';

class UserInChatroomRepository {
    async findOne(filter) {
        return await db.UserInChatroom.findOne({ where: filter });
    }
    async getUsersInChatroomByChatoomId(
        { page, pageSize, orderBy, orderDirection },
        chatroomId
    ) {
        const paginationQuery = pagingConfig(
            page,
            pageSize,
            orderBy,
            orderDirection
        );
        const { count, rows } = await db.UserInChatroom.findAndCountAll({
            where: {
                chatroomId,
            },
            ...paginationQuery,
        });

        return {
            usersInChatroom: rows,
            ...paginationResponse(paginationQuery, pageSize, page, count),
        };
    }
    async isExistUserInChatroom(userId, chatroomId) {
        const isExistUserInChatroom = await db.UserInChatroom.findOne({
            where: {
                member: userId,
                chatroomId,
            },
        });
        if (isExistUserInChatroom) return true;
        return false;
    }
    async findChatroomIdsByMemberIds(...memberIds) {
        const resp = await db.UserInChatroom.findAll({
            attributes: ['chatroomId'],
            where: {
                member: {
                    [Op.in]: [...memberIds],
                },
            },
            raw: true,
            group: ['chatroomId'],
            having: literal(
                'COUNT(DISTINCT member) = ' + [...memberIds].length
            ),
        });
        return resp[0].chatroomId;
    }
    async addUserIntoChatroomById(userId, chatroomId) {
        return await db.UserInChatroom.findOrCreate({
            where: {
                member: userId,
                chatroomId,
            },
            defaults: {
                member: userId,
                chatroomId,
            },
        });
    }
    async removeUserFromChatroom(userId, chatroomId) {
        return await db.UserInChatroom.destroy({
            where: {
                member: userId,
                chatroomId,
            },
            force: true,
        });
    }
}
export default new UserInChatroomRepository();
