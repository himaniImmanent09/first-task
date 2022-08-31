const Validator = require("validator");
const isEmpty = require("./isEmpty");

const {
  password: passwordRegex,
  username: username,
  repeat_password: repeat_passwordRegex,
  min: minLength,
  minPassword: minPasswordLength,
  max: maxLength,
} = require("./constants");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "please enter your username";
  } else if (data.username.length <=1) {
    errors.username = "select a valid username";
  }else if (!data.username.match(username)) {
    errors.username = "incorrect username";
  }


  if (Validator.isEmpty(data.email)) {
    errors.email = "please enter your email";
  }
  else if (!Validator.isEmail(data.email)) {
    errors.email = "please enter a valid email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "please enter your password";
  } else if (!data.password.match(passwordRegex)) {
    errors.password = "password must contain a uppercase letter, numberic value, a special character";
  }
  

  return {
    errors,
    isValid: isEmpty(errors),
  };
};