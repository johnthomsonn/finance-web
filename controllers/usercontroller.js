const express = require("express");
const User = require("../models/usermodel");
const _ = require("lodash");
const cLog = require("../utils/Custom-Logging");

exports.getUserByUsernameParam = (req, res, next, username) => {
  User.findOne({username}, (err, user) => {
    if (err || !user) {
      cLog.error("Error finding user by username param: " + err);
      return res.status(400).json({
        error: "Could not get user from username in URL"
      });
    } else {
      req.user = user;
      next();
    }
  });
};
