import client from '../../config/db/redis';
import createError from 'http-errors';
import SERVICE_RATE_LIMITER_CONFIG from '../../config/rateLimiter/serviceRateLimiterConfig';
import { RateLimiterRedis } from 'rate-limiter-flexible';
/**
 * Middleware Service Limiter
 * @param {string} action - Loại giới hạn (e.g., "LOGIN", "REGISTRATION")
 * @param {function} generateRateLimiterKey - Hàm tạo key cho Rate Limiter
 */
const applyServiceLimiter = (action, generateRateLimiterKey) => {
    const config = SERVICE_RATE_LIMITER_CONFIG[action];

    const limiter = new RateLimiterRedis({
        storeClient: client,
        keyPrefix: config.keyPrefix,
        points: config.points,
        duration: config.duration,
        blockDuration: config.blockDuration,
    });

    return (req, res, next) => {
        const key = generateRateLimiterKey(req);
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
export default applyServiceLimiter;
