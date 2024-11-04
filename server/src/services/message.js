import { literal, Op, where } from 'sequelize';
import db, { sequelize } from '../models';
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
    userId,
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
                where: {
                    ...query,
                    id: {
                        [Op.notIn]: literal(`
                            (SELECT message_id FROM user_message_status
                             WHERE user_id = ${userId} AND is_deleted = true)
                        `),
                    },
                },
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
export const deleteMessageForUser = (userId, messageId) =>
    new Promise(async (resolve, reject) => {
        try {
            await db.UserMessageStatus.upsert(
                {
                    user_id: userId,
                    message_id: messageId,
                    is_deleted: true,
                },
                {
                    conflictFields: ['user_id', 'message_id'],
                }
            );

            resolve({
                message: `Message ${messageId} marked as deleted for user ${userId}.`,
            });
        } catch (error) {
            reject(error);
        }
    });
export const deleteAllMessagesUpToNowForUser = (userId, chatrommId) =>
    new Promise(async (resolve, reject) => {
        const transaction = await sequelize.transaction();
        try {
            await sequelize.query(
                `
                    INSERT INTO user_message_status (user_id, message_id, is_deleted)
                    SELECT :userId, m.id, true
                    FROM messages m
                    WHERE m.chatroomId = :chatrommId
                      AND m.createdAt <= NOW()
                    ON DUPLICATE KEY UPDATE is_deleted = true;
                    `,
                {
                    replacements: { userId, chatrommId },
                    transaction,
                }
            );
            await transaction.commit();
            resolve({
                message: 'All current messages marked as deleted for user.',
            });
        } catch (error) {
            await transaction.rollback();
            reject(error);
        }
    });
