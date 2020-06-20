const express = require('express')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')


exports.signup = async (req,res) => {
  const email = _.toLower(req.body.email);
  const username = _.toLower(req.body.username);

  //User emailUser = await User.findOne({email})

}
