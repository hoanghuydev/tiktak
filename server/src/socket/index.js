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
        if (loginUserSession.userId) {
            removeUser(loginUserSession.socketId);
            io.to(loginUserSession.socketId).emit('logout', {
                message: 'The account was logged in from somewhere else!',
            });
            io.sockets.sockets[loginUserSession.socketId].disconnect();
        }
        console.log(`User connected to socket`);

        socket.on(process.env.JOIN_CHATROOM_ACTION_SOCKET, (chatroomId) => {
            socket.join(chatroomId);
            console.log('A user joined chat room: ' + chatroomId);
        });
        socket.on(process.env.LEAVE_CHATROOM_ACTION_SOCKET, (chatroomId) => {
            socket.leave(chatroomId);
            console.log('A user left chat room: ' + chatroomId);
        });
        socket.on(process.env.ADD_USER_ONLINE_ACTION_SOCKET, (userId) => {
            addUser(userId, socket.id);
            console.log(onlineUsers);

            // console.log(socket.handshake.sessionID);
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
            console.log('A user disconnected ' + socket.id);
            removeUser(socket.id);
            io.emit('getUsers', onlineUsers);
        });
    });
}
module.exports = handleSocket;
