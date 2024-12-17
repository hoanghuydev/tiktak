import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import createError from 'http-errors';
import RedisStorage from '../../storages/redis/RedisStorage';
class CreateRefreshTokenCommand {
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
    async execute(user) {
        const refreshToken = await jwt.sign(
            {
                id: user.id,
                email: user.email,
                roleValue: user.roleData.value,
            },
            this.privateKey,
            { expiresIn: '365d', algorithm: 'RS256' }
        );
        const oneYear = 356 * 24 * 60 * 60;
        const key = `refreshToken:userId:${user.id}`;
        await RedisStorage.save(key, refreshToken, oneYear);
        return refreshToken;
    }
}
export default new CreateRefreshTokenCommand().execute;
