import db from '../models';

export const createVideoCall = (chatroomId, callerId) =>
    new Promise(async (resolve, reject) => {
        try {
            const videoCall = await db.VideoCall.create({
                chatroomId,
                callerId,
                callStatus: 'pending',
            });
            resolve(videoCall);
        } catch (error) {
            reject(error);
        }
    });

export const getVideoCallById = (callId) =>
    new Promise(async (resolve, reject) => {
        try {
            const videoCall = await db.VideoCall.findOne({
                where: { call_id: callId },
                include: [
                    {
                        model: db.User,
                        as: 'callerData',
                        attributes: ['id', 'userName', 'fullName'],
                    },
                    { model: db.Chatroom, as: 'chatroomData' },
                ],
            });
            resolve(videoCall);
        } catch (error) {
            reject(error);
        }
    });

export const updateVideoCallStatus = (callId, status) =>
    new Promise(async (resolve, reject) => {
        try {
            const updatedCall = await db.VideoCall.update(
                { callStatus: status },
                { where: { call_id: callId } }
            );
            resolve(updatedCall);
        } catch (error) {
            reject(error);
        }
    });

export const endVideoCall = (callId) =>
    new Promise(async (resolve, reject) => {
        try {
            const endCall = await db.VideoCall.update(
                { callStatus: 'ended', endTime: new Date() },
                { where: { call_id: callId } }
            );
            resolve(endCall);
        } catch (error) {
            reject(error);
        }
    });
