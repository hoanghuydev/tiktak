import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import client from '../config/db/redis';
import createError from 'http-errors';

class TokenService {
    constructor() {
        this.privateKeyPath = path.join(__dirname, '..', 'key', 'private.pem');
        this.publicKeyPath = path.join(__dirname, '..', 'key', 'publickey.crt');
        this.privateKey = fs.readFileSync(this.privateKeyPath, 'utf8');
        this.publicKey = fs.readFileSync(this.publicKeyPath, 'utf8');
    }

    generateAccessToken(user) {
        return (
            'Bearer ' +
            jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    roleValue: user.roleData.value,
                },
                this.privateKey,
                { expiresIn: '2d', algorithm: 'RS256' }
            )
        );
    }

    generateRefreshToken(user) {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                roleValue: user.roleData.value,
            },
            this.privateKey,
            { expiresIn: '365d', algorithm: 'RS256' }
        );
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
        } catch (error) {
            throw createError.Unauthorized('Invalid token');
        }
    }

    async setRefreshTokenToRedis(token, userId) {
        return new Promise(async (resolve, reject) => {
            await client.set(
                String(`refreshToken:userId:${userId}`),
                token,
                {
                    EX: 356 * 24 * 60 * 60,
                },
                (err, reply) => {
                    if (err) {
                        return reject(err);
                    }
                }
            );
            resolve(true);
        });
    }

    async removeRefreshTokenFromRedis(userId) {
        const key = `refreshToken:userId:${userId}`;
        try {
            await client.del(String(key));
            return true;
        } catch (err) {
            throw createError.InternalServerError(
                'Failed to remove refresh token'
            );
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

export default new TokenService();
