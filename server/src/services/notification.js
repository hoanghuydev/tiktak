import { Op, where } from 'sequelize';
import db from '../models';
import { paginationResponse, pagingConfig } from '../utils/pagination';
export const getNotificationsByUserId = (
    userId,
    { page, pageSize, orderBy, orderDirection }
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const { count, rows } = await db.Notification.findAndCountAll({
                where: { userId },
                attributes: {
                    exclude: ['userId', 'updatedAt'],
                },
                ...queries,
            });

            resolve({
                users: rows,
                ...paginationResponse(queries, pageSize, page, count),
            });
        } catch (error) {
            reject(error);
        }
    });
export const insertNotification = (userId, content) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.Notification.create({
                userId,
                content,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const removeNotification = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Notification.findOne({
                where: { id },
            });
            if (resp) {
                await resp.destroy();
                resolve(resp);
            } else resolve(null);
        } catch (error) {
            reject(error);
        }
    });
/**
 * @typedef {Object} NotifyModel
 * @property {boolean} isSeen - is Seen that notify
 * @property {string} content - The content of the notify.
 */

/**
 * @param {NotifyModel} notifyModel - The notify object.
 */
export const updateNotification = (id, notifyModel) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.Notification.update({
                where: { id },
                data: notifyModel,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const seenNotification = async () => {
    try {
        const resp = await db.Notification.updateMany({
            data: {
                isSeen: true,
            },
        });
        return resp;
    } catch (error) {
        throw error;
    }
};
