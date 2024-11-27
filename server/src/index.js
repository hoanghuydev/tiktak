const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { getConnection, syncDb } = require('./config/db');
import route from './routes';
import startCron from './cron';
import './config/oauth/passport';
const client = require('./config/db/redis');
const { globalErrorHandler } = require('./middleware/errorHandler');
const applyGatewayLimiter = require('./middleware/rateLimiter/gatewayLimiter');
const { Server } = require('socket.io');
const handleSocket = require('./socket');
require('module-alias/register');

const app = express();
const port = 8000;
dotenv.config();
getConnection();
startCron();
app.use(cookieParser());

app.use(
    cors({
        origin: ['http://localhost:5173', 'http://localhost:8000'], // 8000 is port of mobile client, 5173 is port of web
        credentials: true,
    })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(applyGatewayLimiter());

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

const io = new Server(server, {
    allowEIO3: true,
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.use((req, res, next) => {
    res.io = io;
    next();
});

route(app);

handleSocket(io);

app.use(globalErrorHandler);
