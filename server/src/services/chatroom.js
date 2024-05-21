import { Op } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
import { query } from 'express';
import { formatQueryUser } from './user';
export const getUsersInChatroom = (
    chatroomId,
    { page, pageSize, orderBy, orderDirection, userName, fullName }
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
                        attributes: ['id', 'userName', 'fullName', 'avatar'],
                        ...formatQueryUser,
                        where: query,
                    },
                ],
                ...queries,
            });
            const users = rows.map((userInChatroom) => userInChatroom['User']);
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
            const { count, rows } = await db.UserInChatroom.findAndCountAll({
                attributes: [],
                where: {
                    member,
                },
                include: [
                    {
                        model: db.Chatroom,
                        attributes: ['id', 'name'],
                    },
                ],

                ...queries,
            });
            const chatrooms = rows.map(
                (userInChatroom) => userInChatroom['Chatroom']
            );
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
