import db from '../models';

export const addUserToCall = (callId, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const userInCall = await db.UserInCall.create({
                callId,
                userId,
                status: 'joined',
            });
            resolve(userInCall);
        } catch (error) {
            reject(error);
        }
    });

export const updateUserStatusInCall = (callId, userId, status) =>
    new Promise(async (resolve, reject) => {
        try {
            const updatedStatus = await db.UserInCall.update(
                { status },
                { where: { callId, userId } }
            );
            resolve(updatedStatus);
        } catch (error) {
            reject(error);
        }
    });

export const getUsersInCall = (callId) =>
    new Promise(async (resolve, reject) => {
        try {
            const usersInCall = await db.UserInCall.findAll({
                where: { callId },
                include: [
                    {
                        model: db.User,
                        as: 'userData',
                        attributes: ['id', 'userName', 'fullName'],
                    },
                ],
            });
            resolve(usersInCall);
        } catch (error) {
            reject(error);
        }
    });
