const express = require('express');
const { editUser, getUser } = require('../controllers/profileController');
const router = express.Router();

router.get('/', getUser);
router.put('/', editUser);

module.exports = router;
