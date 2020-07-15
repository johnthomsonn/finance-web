const { check, validationResult } = require("express-validator");

exports.getSignupErrors = [
  check("username", "username is required")
    .not()
    .isEmpty()
    .custom(value => !/@/.test(value))
    .withMessage("Username cannot contain the @ symbol")
    .custom(value => !/[<\s:[\]/>\\'"!]/.test(value))
    .withMessage("username cannot contain spaces or special characters")
    .trim(),

  check("email", "A valid email is required")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail(),

  check("password", "A password is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at leat 8 characters")
];

exports.signupValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array();
    const msgs = errArray.map(error => error.msg);
    return res.status(400).json({ error: msgs });
  }
  next();
};

exports.getSignInErrors = ([
  check("unique", "Must be filled in")
    .not()
    .isEmpty(),
  check("password", "A password is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at leat 8 characters")
]);

exports.signinValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array()
    const msgs = errArray.map(error => error.msg)
    return res.status(400).json({ error: msgs })
  }
  next();
};
