require("dotenv").config();
const express = require("express");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const cLog = require("../utils/custom-Logging");
const expressJWT = require("express-jwt");

//ensures that the user performing the action matches the user having the action performed on
exports.validateUser = (req, res, next) => {
  if (req.auth.toString() == req.user._id) next();
  else {
    return res.status(400).json({
      error: "You are not authorised to perform this action."
    });
  }
};

//checks that the user is logged in by checking cookie
exports.needAuthentication = async (req, res, next) => {
  try {
    const authCookie = req.cookies.financeToken;
    if (!authCookie) {
      return res.status(400).json({
        error: "You are not signed in."
      });
    } else {
      const isValidAuth = jwt.verify(authCookie, process.env.JWT_SECRET);
      if (!isValidAuth) {
        //invalid token so just clear the cookie
        res.cookie("financeToken", "", {maxAge: 0});
        return res.status(400).json({
          error: "Invalid authentication credentials."
        });
      } else {
        //valid credentails => check correct user id (if found then correct id)
        const foundUser = await User.findById(isValidAuth._id);
        if (!foundUser || foundUser == undefined) {
          return res.status(400).json({
            error: "Invalid authentication credentials."
          });
        } else {
          req.auth = foundUser._id;
          next();
        }
      }
    }
  } catch (err) {
    cLog.error("Error authenticating user: " + err);
    return res.status(400).json({
      error: "Error authenticating user:"
    });
  }
};

exports.signup = async (req, res) => {
  const email = _.toLower(req.body.email);
  const username = _.toLower(req.body.username);

  if (req.body.password !== req.body.confirm) {
    return res.status(400).json({
      error: "Passwords do not match, please correct this and try again."
    });
  }

  try {
    const foundEmail = await User.findOne({email});
    const foundUsername = await User.findOne({username});

    if (foundUsername || foundEmail) {
      return res.status(409).json({
        error: "Username or Email already exist."
      });
    } else {
      const newUser = await new User({
        email,
        username,
        password: req.body.password
      });
      const savedUser = await newUser.save();
      if (!savedUser) {
        return res.status(500).json({
          error: "Error when creating or saving the new user."
        });
      } else {
        const token = jwt.sign(
          {
            _id: savedUser._id
          },
          process.env.JWT_SECRET
        );

        const cookieOptions = {
          httpOnly: true,
          expires: 0,
          sameSite: "Strict"
        };

        res.cookie("financeToken", token, cookieOptions);

        const {_id, email, username} = savedUser;
        return res.status(201).json({
          user: {
            _id,
            email,
            username
          }
        });
      }
    }
  } catch (err) {
    cLog.error(err);
  }
};

// unique could be an email or username depending on what the user tries to sign in with
exports.signin = async (req, res) => {
  let foundUser = undefined;
  const unique = _.toLower(req.body.unique);

  try {
    if (/@/.test(unique)) {
      foundUser = await User.findOne({email: unique});
    } else {
      foundUser = await User.findOne({username: unique});
    }
    if (!foundUser || foundUser === undefined) {
      return res.status(400).json({
        error: "Invalid sign in information."
      });
    } else {
      const passwordsMatch = await foundUser.comparePasswords(
        req.body.password
      );
      if (!passwordsMatch) {
        return res.status(400).json({
          error: "Invalid sign in information."
        });
      } else {
        const token = jwt.sign(
          {
            _id: foundUser._id
          },
          process.env.JWT_SECRET
        );

        const cookieOptions = {
          httpOnly: true,
          expires: 0,
          sameSite: "Strict"
        };

        res.cookie("financeToken", token, cookieOptions);

        const {_id, email, username} = foundUser;
        return res.status(201).json({
          user: {
            _id,
            email,
            username
          }
        });
      }
    }
  } catch (err) {
    cLog.error("Error on signin: " + err);
  }
};

exports.signout = (req, res) => {
  res.cookie("financeToken", "", {maxAge: 0});
  return res.json({
    message: "Signed out"
  });
};
