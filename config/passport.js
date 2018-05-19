const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');

// Need Mongoose to search for the user in the JWT payload
const mongoose = require('mongoose');
// Need the User model from Mongoose
const User = mongoose.model('users');

const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secreteOrKey;

module.exports = passport => {
  passport.use(
    new Strategy(options, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          // If the user is found return the user
          if (user) {
            return done(null, user);
          }
          // Return false if the user is not found
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
