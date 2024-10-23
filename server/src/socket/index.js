import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
function handleSocket(io) {
    io.use(async (socket, next) => {
        try {
            const accessToken = socket.handshake.query.token.split(' ')[1];
            const payload = await jwt.verify(
                accessToken,
                fs.readFileSync(
                    path.join(__dirname, '..', 'key', 'publickey.crt')
                ),
                { algorithm: 'RS256' }
            );
            socket.userId = payload.id;
            next();
        } catch (error) {
            console.log(error);
        }
    });

    let onlineUsers = [];
    const addUser = (userId, socketId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({ userId, socketId });
    };
    const removeUser = (socketId) => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
    };

    io.on('connection', (socket) => {
        console.log(`User ${socket.userId} connected to socket`);
        socket.on(process.env.JOIN_CHATROOM_ACTION_SOCKET, (chatroomId) => {
            socket.join(chatroomId);
            console.log('A user joined chat room: ' + chatroomId);
        });
        socket.on(process.env.LEAVE_CHATROOM_ACTION_SOCKET, (chatroomId) => {
            socket.leave(chatroomId);
            console.log('A user left chat room: ' + chatroomId);
        });
        socket.on(process.env.ADD_USER_ONLINE_ACTION_SOCKET, (userId) => {
            const loginUserSession = onlineUsers.filter(
                (user) => user.userId === userId
            );
            if (loginUserSession.userId) {
                removeUser(loginUserSession.socketId);
                io.to(loginUserSession.socketId).emit('logout', {
                    message: 'The account was logged in from somewhere else!',
                });
                io.sockets.sockets[loginUserSession.socketId].disconnect();
            }
            addUser(socket.userId, socket.id);
            socket.join(`user_${socket.userId}`);
            io.emit(process.env.GET_USER_ONLINE_ACTION_SOCKET, onlineUsers);
        });
        // socket.on('sendMessage', async ({ sender, chatroomId, text }) => {
        //     if (text.trim().length > 0) {
        //         io.to(chatroomId).emit('newMessage', {
        //             chatroomId,
        //             text,
        //             sender,
        //             createdAt: Date.now(),
        //         });
        //     }
        // });
        socket.on('disconnect', () => {
            console.log(`User ${socket.userId} disconnected`);
            removeUser(socket.id);
            io.emit('getUsers', onlineUsers);
        });
    });
}
module.exports = handleSocket;
