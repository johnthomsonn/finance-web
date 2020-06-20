require ('dotenv').config();
const express = require('express')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')
const cLog = require('../utils/custom-Logging')


exports.signup = async (req,res) => {
  const email = _.toLower(req.body.email);
  const username = _.toLower(req.body.username);

  if(req.body.password !== req.body.confirm)
  {
    return res.status(400).json({
      error : "Passwords do not match, please correct this and try again."
    })
  }

  try {

  const foundEmail = await User.findOne({email})
  const foundUsername = await User.findOne({username})

  if(foundUsername || foundEmail)
  {
    return res.status(409).json({
      error : "Username or Email already exist."
    })
  }
  else
  {
    const newUser = await new User({
      email,
      username,
      password : req.body.password
    })
    const savedUser = await newUser.save();
    if(!savedUser)
    {
      return res.status(500).json({
        error : "Error when creating or saving the new user."
      })
    }
    else
    {
      const token = jwt.sign({
        _id : savedUser._id
      },
        process.env.JWT_SECRET
      )

      const cookieOptions = {
        httpOnly : true,
        expires : 0,
        sameSite: "Strict"
      }

      res.cookie("financeToken", token, cookieOptions)

      const {_id, email, username} = savedUser
      return res.status(201).json({
        user : {
          _id,
          email,
          username
        }
      })
    }

  }

}
catch(err) {cLog.error(err)}

}
