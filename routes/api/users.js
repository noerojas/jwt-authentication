// User Authentication
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../../models/User');

// @route  GET /api/user/test
// @desc   Tests route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'users work' }));

// @route  GET /api/users/register
// @desc   Register new user
// @access Public
router.post('/register', (req, res) => {
  // Query the database to search for the email being registered
  // Reason is so that there are no duplicate email registrations
  User.findOne({ email: req.body.email }).then(userEmail => {
    // If the email exists return status code 400
    if (userEmail) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    // Creating a new resource (user) with Mongoose
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Generate salt for users password
    bcrypt.genSalt(10, (err, salt) => {
      // Hash the user's password
      bcrypt.hash(newUser.password, salt, (hashError, hash) => {
        if (hashError) throw hashError;
        newUser.password = hash;
        // Save the new resource (user) with the hashed+salted password
        newUser
          .save()
          .then(user => res.json(user))
          .catch(saveError => console.log(saveError));
      });
    });

    return res.status(400);
  });
});

module.exports = router;
