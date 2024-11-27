const express = require('express');
const router = express.Router();
import RoleController from '../controllers/RoleController';
import Auth from '../middleware/auth';
router.post('/', Auth.isAdmin, RoleController.insertRole);
router.delete('/', Auth.isAdmin, RoleController.removeRole);
module.exports = router;
