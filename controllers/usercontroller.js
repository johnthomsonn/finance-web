const express = require("express");
const User = require("../models/usermodel");
const _ = require("lodash");
const cLog = require("../utils/Custom-Logging");

exports.getUserByUsernameParam = (req, res, next, username) => {
  User.findOne({ username }, (err, user) => {
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

exports.updateBalance = (req, res) => {
  User.findByIdAndUpdate(req.auth, { $set: { balance: req.body.balance } }, { new: true, useFindAndModify: false }, (err, doc) => {
    cLog.debug(doc)
    if (err || !doc) {
      return res.status(400).json({
        error: "Error updating balance."
      });

    }
    else {
      return res.json({
        balance: doc.balance
      });
    }
  });
}
