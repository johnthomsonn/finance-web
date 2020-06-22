const express = require('express')
const mongoose = require('mongoose')
const {uuid} = require('uuidv4')
const bcrypt = require('bcrypt')
const {ObjectId} = mongoose.Schema;
const saltRounds = 12;
const transactionSchema = require('./transactionmodelschema')

const userSchema = new mongoose.Schema({
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
  transactions : [transactionSchema],
  balance : {
    type: Number,
    default : 0
  },
  created : {
    type : Date,
    default : Date.now
  }
})

userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    //encrypt _password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => this._password)



userSchema.methods = {
  authenticate: async function(plaintext){
    return await this.encryptPassword(plaintext) === this.hashed_password;
  },

  encryptPassword: function(password) {
    return bcrypt.hashSync(password, saltRounds);
  },

  comparePasswords : async function(pwdToCompare) {
    return await bcrypt.compare(pwdToCompare, this.hashed_password);
  }
}


module.exports =  mongoose.model("User", userSchema)
