const express = require("express");
const router = express.Router();

const { signup, signin, signout, deleteUser } = require("../controllers/authcontroller");
const { getSignupErrors, signupValidation, getSignInErrors, signinValidation } = require("../validation/authvalidation");


router.post("/signup", getSignupErrors, signupValidation, signup);
router.post("/signin", getSignInErrors, signinValidation, signin);
router.get("/signout", signout);
router.delete("/", deleteUser);

module.exports = router;
