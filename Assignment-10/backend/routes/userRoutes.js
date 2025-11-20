const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/authMiddleware');
const { createUser, getUsers, login } = require('../controllers/userController');

// Create user (admin only)
router.post('/user/create', auth, authorizeRoles('admin'), createUser);

// Get all users without passwords (admin only)
router.get('/users', auth, authorizeRoles('admin'), getUsers);

// Login (no auth required)
router.post('/user/login', login);

module.exports = router;