// User Authentication
const express = require('express');

const router = express.Router();

// @route  GET /api/test/posts
// @desc   Tests route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'posts work' }));

module.exports = router;
