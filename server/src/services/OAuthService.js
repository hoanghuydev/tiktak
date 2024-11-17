import tokenService from './TokenService';
import userRepository from '../repositories/UserRepository';

class OAuthService {
    async handleOAuth2(user) {
        const refreshToken = tokenService.generateRefreshToken(user);
        await tokenService.setRefreshTokenToRedis(refreshToken, user.id);
        return refreshToken;
    }
}

export default new OAuthService();
