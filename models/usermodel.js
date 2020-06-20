const express = require('express')
const mongoose = require('mongoose')
const {uuid} = require('uuidv4')
const brypt = require('bcrypt')
const {ObjectId} = mongoose.schema;
const saltRounds = 15;

const userShema = new mongoose.Schema({
  username : {
    type:String,
    trim : true,
    required : true
  },
  email : {
    type : String,
    trim : true,
    required : true
  },
  hashed_password : {
    type : String,
    required : true
  },

})

userShema.virtual('password')
.set( async password => this.hashed_password = bcrypt.hashSync(password, saltRounds) )

userShema.methods = {
  comparePasswords : async pwdToCompare => brypt.compare(pwdToCompare, this.hashed_password)
}


module.exports mongoose.model("User", userSchema)
