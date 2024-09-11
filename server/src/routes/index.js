const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const followRouter = require('./follower');
const chatroomRouter = require('./chatroom');
const roleRouter = require('./role');
const notificationRouter = require('./notification');
const messageRouter = require('./message');
const postRouter = require('./post');
const commentRouter = require('./comment');
function route(app) {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/follow', followRouter);
    app.use('/api/v1/chatroom', chatroomRouter);
    app.use('/api/v1/role', roleRouter);
    app.use('/api/v1/notification', notificationRouter);
    app.use('/api/v1/message', messageRouter);
    app.use('/api/v1/post', postRouter);
    app.use('/api/v1/comment', commentRouter);
}
export default route;
