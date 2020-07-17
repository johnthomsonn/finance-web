const express = require("express");
const router = express.Router();

const { signup, signin, signout, deleteUser } = require("../controllers/authcontroller");
const { getSignupErrors, signupValidation, getSignInErrors, signinValidation } = require("../validation/authvalidation");
const { updateBalance } = require("../controllers/usercontroller");


router.post("/signup", getSignupErrors, signupValidation, signup);
router.post("/signin", getSignInErrors, signinValidation, signin);
router.patch("/edit/balance", updateBalance);
router.get("/signout", signout);
router.delete("/", deleteUser);

module.exports = router;
