import { RateLimiterRedis } from 'rate-limiter-flexible';
import client from '../../config/db/redis';
import createError from 'http-errors';
import GATEWAY_RATE_LIMITER_CONFIG from '../../config/rateLimiter/gatewayRateLimiterConfig';
const applyGatewayLimiter = () => {
    const config = GATEWAY_RATE_LIMITER_CONFIG.IP_BASED;

    const limiter = new RateLimiterRedis({
        storeClient: client,
        keyPrefix: config.keyPrefix,
        points: config.points,
        duration: config.duration,
        blockDuration: config.blockDuration,
    });

    return (req, res, next) => {
        const key = req.ip;
        limiter
            .consume(key)
            .then(() => next())
            .catch(() => {
                const error = createError.TooManyRequests(
                    'Too many requests. Please try again.'
                );
                next(error);
            });
    };
};

export default applyGatewayLimiter;
