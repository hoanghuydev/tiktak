const express = require('express');
const router = express.Router();
import UserController from '../controllers/UserController';
import Auth from '../middleware/auth';
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.get('/find', Auth.setUser, UserController.findUser);
router.get('/me', Auth.origin, UserController.me);
router.get('/profile/:username', Auth.setUser, UserController.getProfile);
router.get('/:userId', UserController.getUser);
router.put('/peer/id', Auth.isSeftUser, UserController.getUser);
router.post(
    '/avatar/:userId',
    Auth.isSeftUser,
    upload.single('avatar'),
    UserController.updateAvatar
);
router.delete('/avatar/:userId', Auth.isSeftUser, UserController.removeAvatar);
router.delete('/:userId', Auth.isSeftUser, UserController.removeUser);

router.put('/:userId', Auth.isSeftUser, UserController.updateUser);
module.exports = router;
