const User = require('../model/User');
const Message = require('../model/Message');
const jwt = require('jsonwebtoken');

function handleSocket(io) {
    // io.use(async (socket, next) => {
    //     try {
    //         const token = socket.handshake.query.token;
    //         const payload = await jwt.verify(
    //             token,
    //             process.env.ACCESS_TOKEN_KEY
    //         );

    //         socket.userId = payload.id;
    //         next();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });
    // io.on('connection', (socket) => {
    //     console.log('A user connected');
    //     socket.on('disconnect', () => {
    //         console.log('A user disconnected');
    //     });
    //     socket.on('joinRoom', ({ chatroomId }) => {
    //         socket.join(chatroomId);
    //         console.log('A user joined chat room: ' + chatroomId);
    //     });
    //     socket.on('leaveRoom', ({ chatroomId }) => {
    //         socket.leave(chatroomId);
    //         console.log('A user left chat room: ' + chatroomId);
    //     });
    //     socket.on('chatMessage', async ({ chatroomId, message }) => {
    //         if (message.trim().length > 0) {
    //             const user = await User.findOne({ _id: socket.userId });
    //             const message = await new Message({
    //                 chatroomId: chatRoomId,
    //                 userId: socket.userId,
    //                 text: message.trim(),
    //             });
    //             io.to(chatroomId).emit('newMessage', {
    //                 message,
    //                 name: user.username,
    //                 userId: socket.userId,
    //             });
    //             await message.save();
    //         }
    //     });
    // });
    let onlineUsers = [];
    const addUser = (userId, socketId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({ userId, socketId });
    };
    const removeUser = (socketId) => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
    };

    io.on('connection', (socket) => {
        const loginUserSession = onlineUsers.filter(
            (user) => user.userId === socket.request.session.user.id
        );
        console.log(loginUserSession);
        if (loginUserSession.userId) {
            removeUser(loginUserSession.socketId);
            io.to(loginUserSession.socketId).emit('logout', {
                message: 'Bạn đã bị đăng xuất vì đăng nhập từ nơi khác.',
            });
            io.sockets.sockets[loginUserSession.socketId].disconnect();
        }

        console.log('A user connected');
        console.log(socket.id);

        socket.on('joinRoom', (chatroomId) => {
            socket.join(chatroomId);
            console.log('A user joined chat room: ' + chatroomId);
        });
        socket.on('leaveRoom', (chatroomId) => {
            socket.leave(chatroomId);
            console.log('A user left chat room: ' + chatroomId);
        });
        socket.on('addUser', (userId) => {
            addUser(userId, socket.id);
            // console.log(socket.handshake.sessionID);
            io.emit('getUsers', onlineUsers);
        });
        socket.on('sendMessage', async ({ sender, chatroomId, text }) => {
            if (text.trim().length > 0) {
                io.to(chatroomId).emit('newMessage', {
                    chatroomId,
                    text,
                    sender,
                    createdAt: Date.now(),
                });
            }
        });
        socket.on('disconnect', () => {
            console.log('A user disconnected' + socket.id);
            removeUser(socket.id);
            io.emit('getUsers', onlineUsers);
        });
    });
}
module.exports = handleSocket;
