const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterInput = data => {
  // Construct an erros object
  const errors = {};

  // If the user's registration fields are not empty
  // return otherwise assign it an empty string
  const nameField = !isEmpty(data.name) ? data.name : '';
  const emailField = !isEmpty(data.email) ? data.email : '';
  const passwordField = !isEmpty(data.password) ? data.password : '';
  const passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

  // If the user's name is less than 2 characters or more than
  // 30 characters append to errors object
  if (!Validator.isLength(nameField, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // If the user's name is empty append to errors object
  if (Validator.isEmpty(nameField)) {
    errors.name = 'Name field is required';
  }

  // If the user's email is empty append to errors object
  if (Validator.isEmpty(emailField)) {
    errors.email = 'Email field is required';
  }

  // If the user's email is not valid append to errors object
  if (Validator.isEmail(emailField)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(passwordField)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isLength(passwordField, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(passwordConfirm)) {
    errors.passwordConfirm = 'Confirm password field is required';
  }

  if (Validator.equals(passwordField, passwordConfirm)) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
