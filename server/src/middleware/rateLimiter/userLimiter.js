import { RateLimiterRedis } from 'rate-limiter-flexible';
import client from '../../config/db/redis';
import createError from 'http-errors';

const userLimiter = new RateLimiterRedis({
    storeClient: client,
    keyPrefix: 'userLimiter',
    points: 50,
    duration: 60,
    blockDuration: 60,
});

const userMiddleware = (req, res, next) => {
    const userId = req.user.id;
    if (!userId) {
        throw createError.Unauthorized('Missing user id');
    }
    userLimiter
        .consume(userId)
        .then(() => next())
        .catch(() => {
            const error = createError.TooManyRequests(
                'Too many requests. Please try again.'
            );
            next(error);
        });
};

module.exports = userMiddleware;
