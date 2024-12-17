import TokenSerivce from './TokenService';

class OAuthService {
    async handleOAuth2(user) {
        const refreshToken = await TokenSerivce.generateRefreshToken(user);
        return { refreshToken };
    }
}

export default new OAuthService();
