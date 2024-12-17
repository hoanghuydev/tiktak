import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import client from '../config/db/redis';
import createError from 'http-errors';
import CreateAccessTokenCommand from '@commands/token/CreateAccessTokenCommand';
import CreateRefreshTokenCommand from '../commands/token/CreateRefreshTokenCommand';
import DeleteRefreshToken from '../commands/token/DeleteRefreshToken';
import GetRefreshTokenQuery from '../queries/token/GetRefreshTokenQuery';

class TokenService {
    constructor() {
        this.privateKeyPath = path.join(__dirname, '..', 'key', 'private.pem');
        this.publicKeyPath = path.join(__dirname, '..', 'key', 'publickey.crt');
        this.privateKey = fs.readFileSync(this.privateKeyPath, 'utf8');
        this.publicKey = fs.readFileSync(this.publicKeyPath, 'utf8');
    }
    async generateAccessToken(user) {
        return await CreateAccessTokenCommand(user);
    }

    async generateRefreshToken(user) {
        return await CreateRefreshTokenCommand(user);
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
        } catch (error) {
            throw createError.Unauthorized('Invalid token');
        }
    }

    async removeRefreshTokenFromRedis(userId) {
        try {
            return await DeleteRefreshToken(userId);
        } catch (err) {
            throw createError.BadRequest('Failed to remove refresh token');
        }
    }

    async getStoredRefreshToken(userId) {
        try {
            return await GetRefreshTokenQuery(userId);
        } catch (err) {
            throw createError.BadRequest('Failed to get refresh token');
        }
    }
}

export default new TokenService();
