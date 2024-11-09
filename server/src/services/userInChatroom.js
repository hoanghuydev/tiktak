import { Op } from 'sequelize';
import db from '../models';
import { paginationResponse, pagingConfig } from '../utils/pagination';
export const getUsersInChatroom = (
    chatroomId,
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
            const { count, rows } = await db.UserInChatroom.findAndCountAll({
                where: {
                    chatroomId,
                },
                ...queries,
            });

            resolve({
                usersInChatroom: rows,
                ...paginationResponse(queries, pageSize, page, count),
            });
        } catch (error) {
            reject(error);
        }
    });
export const isExistUserInChatroom = (member, chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const isExistUserInChatroom = await db.UserInChatroom.findOne({
                where: {
                    member,
                    chatroomId,
                },
            });
            if (isExistUserInChatroom) resolve(true);
            else resolve(false);
        } catch (error) {
            reject(error);
        }
    });
export const findChatroomIdWithMembers = (...memberIds) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.UserInChatroom.findAll({
                attributes: ['chatroomId'],
                where: {
                    member: {
                        [Op.in]: [...memberIds],
                    },
                },
                raw: true,
                group: ['chatroomId'],
                having: db.sequelize.literal(
                    'COUNT(DISTINCT member) = ' + [...memberIds].length
                ),
            });
            resolve(resp[0].chatroomId);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
export const addUserIntoChatroom = (member, chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.UserInChatroom.findOrCreate({
                where: {
                    member,
                    chatroomId,
                },
                defaults: {
                    member,
                    chatroomId,
                },
            });
            resolve(resp);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
export const removeUserFromChatroom = (member, chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.UserInChatroom.destroy({
                where: {
                    member,
                    chatroomId,
                },
            });
            resolve(resp);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
