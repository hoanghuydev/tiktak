import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import client from '../../../config/db/redis';
import createError from 'http-errors';
class TokenQueryService {
    constructor() {
        this.privateKeyPath = path.join(
            __dirname,
            '..',
            '..',
            '..',
            'key',
            'private.pem'
        );
        this.publicKeyPath = path.join(
            __dirname,
            '..',
            '..',
            '..',
            'key',
            'publickey.crt'
        );
        this.privateKey = fs.readFileSync(this.privateKeyPath, 'utf8');
        this.publicKey = fs.readFileSync(this.publicKeyPath, 'utf8');
    }
    async verifyToken(token) {
        try {
            return jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
        } catch (error) {
            throw createError.Unauthorized('Invalid token');
        }
    }
    async getStoredRefreshToken(userId) {
        const key = `refreshToken:userId:${userId}`;
        try {
            const reply = await client.get(String(key));
            return reply;
        } catch (err) {
            throw createError.InternalServerError(
                'Failed to get refresh token'
            );
        }
    }
}
export default new TokenQueryService();
