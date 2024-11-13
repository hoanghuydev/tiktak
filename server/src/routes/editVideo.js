const express = require('express');
const router = express.Router();
import EditVideoController from '../controller/EditVideoController';
import Auth from '../middleware/auth';
router.get('/fonts', Auth.setUser, EditVideoController.getListFonts);
router.post('/fonts/new', Auth.isAdmin, EditVideoController.addNewFont);
router.get('/filters', Auth.setUser, EditVideoController.getListFilters);
router.post('/filters/new', Auth.isAdmin, EditVideoController.addNewFilter);
router.get('/effects', Auth.setUser, EditVideoController.getListEffects);
router.post('/effects/new', Auth.isAdmin, EditVideoController.addNewEffect);
router.post('/edit', Auth.origin, EditVideoController.editVideo);

module.exports = router;
