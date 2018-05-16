// User Authentication
const express = require('express');

const router = express.Router();

// @route  GET /api/test/profile
// @desc   Tests route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'profile work' }));

module.exports = router;
