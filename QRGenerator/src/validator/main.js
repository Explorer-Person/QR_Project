const { body, validationResult } = require("express-validator");

// Middleware to handle validations
const validateUser = [
    // Validations for fields inside data.info
    body("data.info.name")
      .notEmpty()
      .withMessage("Name must be provided")
      .isString()
      .withMessage("Name must be a string"),
  
    body("data.info.surname")
      .notEmpty()
      .withMessage("Surname must be provided")
      .isString()
      .withMessage("Surname must be a string"),
  
    body("data.info.phone")
      .notEmpty()
      .withMessage("Phone number must be provided")
      .isString()
      .withMessage("Phone must be a string"),
  
    body("data.info.role")
      .notEmpty()
      .withMessage("Role must be provided")
      .isString()
      .withMessage("Role must be a string"),
  
    body("data.info.email")
      .notEmpty()
      .withMessage("Email must be provided")
      .isEmail()
      .withMessage("Invalid email format"),
  
    body("data.info.tcNumber")
      .notEmpty()
      .withMessage("TC Number must be provided")
      .isString()
      .withMessage("TC Number must be a string"),
  
    body("data.info.bornDate")
      .notEmpty()
      .withMessage("Born Date must be provided")
      .isISO8601()
      .withMessage("Invalid date format for Born Date"),
  
    body("data.info.targetUrl")
      .notEmpty()
      .withMessage("Target URL must be provided")
      .isURL()
      .withMessage("Invalid URL format for Target URL"),
  
    // Additional validations can be added as needed
  ];

  // Middleware to handle validations
const validateAdmin = [
  // Validations for fields inside data.info
  body("data.info.username")
    .notEmpty()
    .withMessage("Username must be provided")
    .isString()
    .withMessage("Username must be a string"),

  body("data.info.password")
    .isString()
    .withMessage("Password must be a string"),

  body("data.info.role")
    .notEmpty()
    .withMessage("Role must be provided")
    .isString()
    .withMessage("Role must be a string"),

  body("data.info.email")
    .notEmpty()
    .withMessage("Email must be provided")
    .isEmail()
    .withMessage("Invalid email format"),

  // Additional validations can be added as needed
];

const validateLogin = [
  // Validations for fields inside data.info
  body("data.username")
    .notEmpty()
    .withMessage("Username must be provided")
    .isString()
    .withMessage("Username must be a string"),

  body("data.password")
    .notEmpty()
    .withMessage("Password must be provided")
    .isString()
    .withMessage("Password must be a string"),

  ];
const { sendResponse } = require("@handlers");

// Middleware to check validation results
const checkValidation = (req, res, next) => {

  const results = validationResult(req);
  if (!results.isEmpty()) {
    return sendResponse(res, results.errors, "validation", false, 400);
  }
  next();
};

module.exports = {
  validateUser,
  validateAdmin,
  validateLogin,
  checkValidation,
};

