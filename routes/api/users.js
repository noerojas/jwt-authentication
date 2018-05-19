const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load configuration keys
const keys = require('../../config/keys');
// Load Input Validation for user registration
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Setup Express Router
const router = express.Router();

const User = require('../../models/User');

// @route  POST /api/users/register
// @desc   Register new user
// @access Public
router.post('/register', (req, res) => {
  // Validate (sanitize) user inputs
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get the register request info
  const { name, email, password } = req.body;
  // Query the database to search for the email being registered
  // Reason is so that there are no duplicate email registrations
  User.findOne({ email }).then(userEmail => {
    // If the email exists return status code 400
    if (userEmail) {
      errors.email = 'Email already exists';
      return res.status(400).json({ errors });
    }
    // Creating a new resource (user) with Mongoose
    const newUser = new User({ name, email, password });
    // Generate salt for users password
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) throw saltError;
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
    return 0;
  });
  return 0;
});

// @route  GET /api/users/login
// @desc   Login User / Returning JSON Web Token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Query the database to find the user's email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    // Compare the hashed password with the user's
    // plain text password using bcryptjs
    bcrypt.compare(password, user.password).then(match => {
      // If user passwords match
      if (match) {
        // Create the payload for the json web token
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign the json web token
        jwt.sign(payload, keys.secreteOrKey, { expiresIn: 3600 }, (signError, token) => {
          if (signError) throw signError;
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
      return 0;
    });
    return 0;
  });
  return 0;
});

// @route  GET /api/users/current
// @desc   Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email } = req.user;
  res.json({
    id,
    name,
    email
  });
});

module.exports = router;
