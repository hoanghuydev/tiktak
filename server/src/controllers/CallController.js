import {
    badRequest,
    forBidden,
    internalServerError,
} from '../utils/handleResp';
import * as chatroomServices from '../services/chatroom';

class CallController {
    // Gửi Offer cho một phòng
    async sendOffer(req, res, next) {
        try {
            const { chatroomId } = req.params;
            const { offer } = req.body;
            if (!offer) {
                return badRequest('Please provide a valid offer', res);
            }

            const getUsers = await chatroomServices.getUsersInChatroom(
                chatroomId,
                req.query
            );
            const usersInChatroom = getUsers.users;

            // Kiểm tra xem người dùng có nằm trong chatroom không
            if (!usersInChatroom.some((user) => user.id === req.user.id))
                return forBidden(
                    'You are not allowed to send offers in this chatroom',
                    res
                );

            // Gửi offer tới các người dùng trong phòng chat qua Socket.io
            const io = res.io;
            const promisesSendOffer = usersInChatroom.map((user) => {
                return io.to(`user_${user.id}`).emit('offer', {
                    chatroomId,
                    offer,
                    senderId: req.user.id,
                });
            });

            await Promise.all(promisesSendOffer);
            return res.status(200).json({
                err: 0,
                mes: 'Offer sent successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    // Gửi Answer cho một phòng
    async sendAnswer(req, res, next) {
        try {
            const { chatroomId } = req.params;
            const { answer } = req.body;
            if (!answer) {
                return badRequest('Please provide a valid answer', res);
            }

            const getUsers = await chatroomServices.getUsersInChatroom(
                chatroomId,
                req.query
            );
            const usersInChatroom = getUsers.users;

            // Kiểm tra xem người dùng có nằm trong chatroom không
            if (!usersInChatroom.some((user) => user.id === req.user.id))
                return forBidden(
                    'You are not allowed to send answers in this chatroom',
                    res
                );

            // Gửi answer tới các người dùng trong phòng chat qua Socket.io
            const io = res.io;
            const promisesSendAnswer = usersInChatroom.map((user) => {
                return io.to(`user_${user.id}`).emit('answer', {
                    chatroomId,
                    answer,
                    senderId: req.user.id,
                });
            });

            await Promise.all(promisesSendAnswer);
            return res.status(200).json({
                err: 0,
                mes: 'Answer sent successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    // Gửi ICE Candidate cho một phòng
    async sendCandidate(req, res, next) {
        try {
            const { chatroomId } = req.params;
            const { candidate } = req.body;
            if (!candidate) {
                return badRequest('Please provide a valid ICE candidate', res);
            }

            const getUsers = await chatroomServices.getUsersInChatroom(
                chatroomId,
                req.query
            );
            const usersInChatroom = getUsers.users;

            // Kiểm tra xem người dùng có nằm trong chatroom không
            if (!usersInChatroom.some((user) => user.id === req.user.id))
                return forBidden(
                    'You are not allowed to send ICE candidates in this chatroom',
                    res
                );

            // Gửi ICE Candidate tới các người dùng trong phòng chat qua Socket.io
            const io = res.io;
            const promisesSendCandidate = usersInChatroom.map((user) => {
                return io.to(`user_${user.id}`).emit('candidate', {
                    chatroomId,
                    candidate,
                    senderId: req.user.id,
                });
            });

            await Promise.all(promisesSendCandidate);
            return res.status(200).json({
                err: 0,
                mes: 'ICE Candidate sent successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new CallController();
