const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLoginInput = data => {
  // Construct an erros object
  const errors = {};

  const email = !isEmpty(data.email) ? data.email : '';
  const password = !isEmpty(data.password) ? data.password : '';

  // If the user's email is not valid append to errors object
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  // If the user's email is empty append to errors object
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
