const express = require('express');
const passport = require('passport');
const router = express.Router();
import AuthController from '../controller/AuthController';
import Auth from '../middleware/auth';
import applyServiceLimiter from '../middleware/rateLimiter/serviceLimiter';
import generateRateLimiterKey from '../utils/generateRateLimiterKey';
router.post(
    '/register',
    applyServiceLimiter('REGISTRATION', (req) =>
        generateRateLimiterKey(req, 'ip')
    ),
    AuthController.register
);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    })
);
router.get('/google/callback', Auth.authGoogle, AuthController.OAuth2);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/login/success', AuthController.loginSuccess);
router.get('/facebook/callback', Auth.authFacebook, AuthController.OAuth2);
router.get(
    '/github',
    passport.authenticate('github', { scope: ['user:email'] })
);
router.get('/github/callback', Auth.authGithub, AuthController.OAuth2);
router.post(
    '/verify-email',
    applyServiceLimiter('VERIFY_EMAIL', (req) =>
        generateRateLimiterKey(req, 'ip')
    ),
    AuthController.verifyAccount
);
router.post(
    '/login',
    applyServiceLimiter('LOGIN', (req) => generateRateLimiterKey(req, 'ip')),
    AuthController.login
);
router.post('/token/refresh', AuthController.refreshToken);
module.exports = router;
