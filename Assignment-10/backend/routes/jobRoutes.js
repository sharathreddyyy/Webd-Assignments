const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/authMiddleware');
const { createJob, getJobs } = require('../controllers/jobController');

// Add job (admin only)
router.post('/create/job', auth, authorizeRoles('admin'), createJob);

// List jobs (any logged-in user; employee will consume this)
router.get('/jobs', auth, getJobs);

module.exports = router;