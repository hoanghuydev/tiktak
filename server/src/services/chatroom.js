import { literal, Op, where } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
import { query } from 'express';
import { formatQueryUser } from './user';
export const getUsersInChatroom = (
    chatroomId,
    {
        page = 1,
        pageSize = 30,
        orderBy = 'createdAt',
        orderDirection = 'DESC',
        userName = '',
        fullName = '',
    }
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const query = {};
            if (userName) query.userName = { [Op.substring]: userName };
            if (fullName) query.fullName = { [Op.substring]: fullName };
            const { count, rows } = await db.UserInChatroom.findAndCountAll({
                attributes: [],
                where: {
                    chatroomId,
                },
                include: [
                    {
                        model: db.User,
                        as: 'memberData',
                        attributes: ['id', 'userName', 'fullName'],
                        ...formatQueryUser,
                        where: query,
                    },
                ],
                ...queries,
            });
            const users = rows.map(
                (userInChatroom) => userInChatroom['memberData']
            );
            const totalItems = count;
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;

            resolve({
                users,
                pagination: {
                    orderBy: queries.orderBy,
                    page: queries.offset + 1,
                    pageSize: queries.limit,
                    orderDirection: queries.orderDirection,
                    totalItems,
                    totalPages,
                },
            });
        } catch (error) {
            reject(error);
        }
    });
export const getChatroomsOfUser = (
    member,
    { page, pageSize, orderBy, orderDirection, name }
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const query = {};
            if (name) query.name = { [Op.substring]: name };
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
                                ...formatQueryUser,
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
                                     WHERE user_id = ${member} AND is_deleted = true)
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
                    ...query,
                    id: {
                        [Op.in]: db.Sequelize.literal(`
                            (SELECT chatroomId FROM usersinchatroom WHERE member = ${member})
                        `),
                    },
                },
                // order: [[orderBy, orderDirection]],
                // limit: pageSize,
                // offset: (page - 1) * pageSize,
                distinct: true,
            });
            const chatrooms = rows;
            const totalItems = count;

            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                chatrooms,
                pagination: {
                    orderBy: queries.orderBy,
                    page: queries.offset + 1,
                    pageSize: queries.limit,
                    orderDirection: queries.orderDirection,
                    totalItems,
                    totalPages,
                },
            });
        } catch (error) {
            reject(error);
        }
    });
export const getChatroom = (chatroomModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Chatroom.findOne({
                where: chatroomModel,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const createChatroom = (name) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Chatroom.create(
                {
                    name,
                },
                { plain: true }
            );
            const rawResp = resp.get({ plain: true });
            resolve(rawResp);
        } catch (error) {
            reject(error);
        }
    });
export const removeChatroom = (chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const usersInChatroom = await db.UserInChatroom.count({
                where: {
                    chatroomId,
                },
            });
            const messagesOfChatroom = await db.Message.count({
                where: {
                    chatroomId,
                },
            });
            if (usersInChatroom || messagesOfChatroom) {
                resolve(null);
            } else {
                const resp = await db.Chatroom.destroy({
                    where: {
                        id: chatroomId,
                    },
                });
                resolve(resp);
            }
        } catch (error) {
            reject(error);
        }
    });
