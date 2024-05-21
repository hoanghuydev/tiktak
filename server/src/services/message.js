import { Op } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
import { formatQueryUser } from './user';
export const getListMessageOfChatroom = async (
    chatroomId,
    { page, pageSize, orderBy, orderDirection, content }
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
            if (content) query.content = { [Op.substring]: content };
            if (chatroomId) query.chatroomId = chatroomId;
            const { count, rows } = await db.Message.findAndCountAll({
                where: query,
                attributes: {
                    exclude: ['sender'],
                },
                include: [
                    {
                        model: db.User,
                        as: 'senderData',
                        attributes: ['id', 'userName', 'fullName', 'avatar'],
                        ...formatQueryUser,
                    },
                ],
                ...queries,
            });
            const totalItems = count;
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                messages: rows,
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
export const sendMessage = (sender, chatroomId, content) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Message.create({
                sender,
                chatroomId,
                content,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const recallMessage = (id, sender) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Message.destroy({
                where: {
                    sender,
                    id,
                },
            });
            if (resp) resolve(resp);
            else resolve(null);
        } catch (error) {
            reject(error);
        }
    });
