import { literal, Op } from 'sequelize';
import db from '../models';
import { formatQueryUserWithAvatarData } from '../services/user';
import { paginationResponse, pagingConfig } from '../utils/pagination';

class ChatroomRepository {
    async findOne(filter) {
        return await db.Chatroom.findOne({
            where: filter,
        });
    }
    async createChatroom(name) {
        return await db.Chatroom.create({ name }, { plain: true }).get({
            plain: true,
        });
    }
    async removeChatroomById(chatroomId) {
        return await db.Chatroom.destroy({
            where: {
                id: chatroomId,
            },
        });
    }
    async getUsersInChatroom(
        { page, pageSize, orderBy, orderDirection, userName, fullName },
        chatroomId
    ) {
        const paginationQuery = pagingConfig(
            page,
            pageSize,
            orderBy,
            orderDirection
        );
        const userQuery = {};
        if (userName) userQuery.userName = { [Op.substring]: userName };
        if (fullName) userQuery.fullName = { [Op.substring]: fullName };
        const { count, rows } = await db.UserInChatroom.findAndCountAll({
            where: {
                chatroomId,
            },
            include: [
                {
                    model: db.User,
                    as: 'memberData',
                    attributes: ['id', 'userName', 'fullName'],
                    ...formatQueryUserWithAvatarData,
                    where: userQuery,
                },
            ],
            ...paginationQuery,
        });
        const users = rows.map(
            (userInChatroom) => userInChatroom['memberData']
        );
        return {
            users,
            ...paginationResponse(paginationQuery, pageSize, page, count),
        };
    }
    async getChatroomsByUserId(
        { page, pageSize, orderBy, orderDirection, name },
        userId
    ) {
        const paginationQuery = pagingConfig(
            page,
            pageSize,
            orderBy,
            orderDirection
        );
        const chatroomQuery = {};
        if (name) chatroomQuery.name = { [Op.substring]: name };
        const { count, rows } = await db.Chatroom.findAndCountAll({
            attributes: ['createdAt', 'id', 'name'],
            include: [
                {
                    model: db.UserInChatroom,
                    as: 'members',
                    attributes: ['member'],

                    include: [
                        {
                            model: db.User,
                            as: 'memberData',
                            attributes: ['id', 'userName', 'fullName'],
                            ...formatQueryUserWithAvatarData,
                        },
                    ],
                },
                {
                    model: db.Message,
                    as: 'lastMessage',
                    attributes: ['id', 'content', 'sender', 'createdAt'],
                    where: {
                        id: {
                            [Op.notIn]: literal(`
                                (SELECT message_id FROM user_message_status
                                 WHERE user_id = ${userId} AND is_deleted = true)
                            `),
                        },
                    },
                    required: false,
                    separate: false,
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                },
            ],
            where: {
                ...chatroomQuery,
                id: {
                    [Op.in]: literal(`
                        (SELECT chatroomId FROM usersinchatroom WHERE member = ${userId})
                    `),
                },
            },
            distinct: true,
        });
        return {
            chatrooms: rows,
            ...paginationResponse(paginationQuery, pageSize, page, count),
        };
    }
    async createChatroom(name) {
        const resp = await db.Chatroom.create(
            {
                name,
            },
            { plain: true }
        );
        const rawResp = resp.get({ plain: true });
        return rawResp;
    }
    async removeChatroom(chatroomId) {
        const resp = await db.Chatroom.destroy({
            where: {
                id: chatroomId,
            },
        });
        return resp;
    }
    async getChatroomById(id) {
        const resp = await db.Chatroom.findByPk(id);
        return resp;
    }
}
export default new ChatroomRepository();
