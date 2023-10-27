const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profile.controllers');
const multer = require('../../libs/multer');

router.post('/update-profile', multer.single('profile_picture'), updateProfile);

module.exports = router;
