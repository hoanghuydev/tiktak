import createHttpError from 'http-errors';

/**
 * Generate key cho Rate Limiter
 * @param {object} req - Request object
 * @param {"ip" | "user" | "ip_user" | "ip_email"} keyType - Loại key
 * @returns {string | null} - Key được tạo hoặc null nếu thiếu thông tin cần thiết
 */
const generateRateLimiterKey = (req, keyType) => {
    switch (keyType) {
        case 'ip':
            return req.ip;
        case 'user':
            return req.body.email || req.user.id;
        case 'ip_user':
            const userId = req.body.email || req.user.id;
            return `${req.ip}_${userId}`;
        default:
            throw createHttpError.InternalServerError(
                'Invalid key type for rate limiter.'
            );
    }
};
export default generateRateLimiterKey;
