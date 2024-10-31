import { Op, where } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
import { formatQueryUser } from './user';
export const findById = async (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const message = await db.Message.findByPk(id, {
                include: [
                    {
                        model: db.User,
                        as: 'senderData',
                        attributes: ['id', 'userName', 'fullName'],
                        ...formatQueryUser,
                    },
                ],
            });
            resolve(message);
        } catch (err) {
            reject(err);
        }
    });
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
                include: [
                    {
                        model: db.User,
                        as: 'senderData',
                        attributes: ['id', 'userName', 'fullName'],
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
export const sendMessage = (sender, chatroomId, content, type) =>
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
export const recallMessage = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Message.destroy({
                where: {
                    id,
                },
            });
            if (resp) resolve(resp);
            else resolve(null);
        } catch (error) {
            reject(error);
        }
    });
export const findOne = (messageModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Message.findOne({ where: messageModel });
            if (resp) resolve(resp);
            else resolve(null);
        } catch (error) {
            reject(error);
        }
    });
