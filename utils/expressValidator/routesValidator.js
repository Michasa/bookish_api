const { body, query, oneOf } = require("express-validator");

const NEW_ADMIN_VALIDATION = [
  body("username", "please provide a username (min 5 chars)").isLength({
    min: 5,
  }),
  body("email", "please provide an email in the correct format")
    .exists()
    .isEmail(),
  body("password", "please provide a password (min 5 chars)"),
];

const ADMIN_LOGIN_VALIDATION = oneOf(
  [query("email").isEmail(), query("id").isNumeric()],
  "please provide the correct query parameters for this route"
);

module.exports = { NEW_ADMIN_VALIDATION, ADMIN_LOGIN_VALIDATION };
