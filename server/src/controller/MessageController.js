import {
    badRequest,
    forBidden,
    internalServerError,
} from '../utils/handleResp';
import * as messageServices from '../services/message';
import * as chatroomServices from '../services/chatroom';

import { v4 as uuidv4 } from 'uuid';
import { MESSAGE_TYPE } from '../../constant';
class MessageController {
    async getMessagesOfChatroom(req, res) {
        try {
            const { chatroomId } = req.params;
            const resp = await messageServices.getListMessageOfChatroom(
                chatroomId,
                req.user.id,
                req.query
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...resp,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async uploadImage(req, res) {
        try {
            const { files } = req;
            for (const file of files) {
                if (file.size / (1024 * 1024) > 30)
                    return badRequest(
                        'Cannot upload file with size more than 30mb',
                        res
                    );
            }
            const images = files.filter((file) => file.fieldname == 'images');
            if (!images.mimetype.includes('image'))
                return badRequest('Field images must be image type', res);
            const imagesLink = [];
            for (const image of images) {
                const uuid = uuidv4();
                const partsImageName = image.originalname.split('.');
                const imageName =
                    partsImageName[0] +
                    uuid +
                    partsImageName[partsImageName.length - 1];
                const imageUploaded = await UploadFile.uploadToGGDriver(
                    image,
                    imageName,
                    process.env.GG_DRIVE_FOLDER_THUMNAIL_ID
                );
                imagesLink.push({
                    id: imageUploaded.id,
                    url: imageUploaded.url,
                });
            }
            return res.status(200).json({
                err: 0,
                mes: 'Upload successfully',
                images: imagesLink,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async sendMessage(req, res) {
        try {
            const { chatroomId } = req.params;
            const { content, type } = req.body;
            if (!Object.values(MESSAGE_TYPE).includes(type) || !content)
                return badRequest('Please enter valid content and type', res);
            const resp = await chatroomServices.getUsersInChatroom(
                chatroomId,
                req.query
            );
            const usersInChatroom = resp.users;
            if (!usersInChatroom.some((user) => user.id === req.user.id))
                return forBidden('You are not allowed to send messages', res);
            const io = res.io;
            const sendMsg = await messageServices.sendMessage(
                req.user.id,
                chatroomId,
                content.trim(),
                type
            );

            if (!sendMsg || !io)
                return badRequest("Couldn't send message", res);
            const message = await messageServices.findById(sendMsg.id);
            const promisesSendMsg = usersInChatroom.map((user) => {
                console.log(`Đã gửi tin nhắn cho user: ${user.id}`);
                return io
                    .to(`user_${user.id}`)
                    .emit(process.env.GET_NEW_MESSAGE_ACTION_SOCKET, {
                        chatroomId,
                        message,
                    });
            });

            await Promise.all(promisesSendMsg);
            return res.status(200).json({
                err: 0,
                mes: 'Sent message successfully',
                message,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async recallMessage(req, res) {
        try {
            const { messageId } = req.params;
            const message = await messageServices.findOne({ id: messageId });
            if (!message) return badRequest('Not found message', res);
            if (message.sender != req.user.id)
                return forBidden(
                    'You are not allowed to recall this message',
                    res
                );
            const getUsers = await chatroomServices.getUsersInChatroom(
                message.chatroomId,
                req.query
            );
            const usersInChatroom = getUsers.users;
            if (!usersInChatroom.some((user) => user.id === req.user.id))
                return forBidden(
                    'You are not allowed to recall messages in this chatroom',
                    res
                );

            const resp = await messageServices.recallMessage(messageId);
            if (resp) {
                const io = res.io;
                if (!io)
                    return badRequest(
                        "Couldn't recall message due to server issues",
                        res
                    );
                const promisesSendRecall = usersInChatroom.map((user) => {
                    return io
                        .to(`user_${user.id}`)
                        .emit(process.env.RECALL_MESSAGE_ACTION_SOCKET, {
                            chatroomId,
                            message: recalledMessage,
                        });
                });

                await Promise.all(promisesSendRecall);
                return res.status(200).json({
                    err: 0,
                    mes: 'Message recalled successfully',
                    message: message,
                });
            } else return badRequest('Message recall failed', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async deleteAllMessagesUpToNowForUser(req, res) {
        const { userId, chatroomId } = req.body;
        try {
            const result =
                await messageServices.deleteAllMessagesUpToNowForUser(
                    userId,
                    chatroomId
                );
            res.status(200).json({
                err: 0,
                mes: result.message,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async deleteMessageForUser(req, res) {
        const { userId, messageId } = req.params;

        try {
            const result = await messageServices.deleteMessageForUser(
                userId,
                messageId
            );
            res.status(200).json({
                err: 0,
                mes: result.message,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
}
export default new MessageController();
