import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
class CreateAccessTokenCommand {
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
}
export default new CreateAccessTokenCommand().execute;
