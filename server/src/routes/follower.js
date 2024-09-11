const express = require('express');
const router = express.Router();
import FollowerController from '../controller/FollowerController';
import Auth from '../middleware/auth';
router.get('/followers/:userId',Auth.setUser, FollowerController.getListFollower);
router.get('/followings/:userId',Auth.setUser, FollowerController.getListFollowing);
router.post('/:userId', Auth.origin, FollowerController.followUser);
router.delete('/:userId', Auth.origin, FollowerController.unfollowUser);

module.exports = router;
