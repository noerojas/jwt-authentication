// User Authentication
const express = require('express');

const router = express.Router();

// @route  GET /api/test/users
// @desc   Tests route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'users work' }));

module.exports = router;
