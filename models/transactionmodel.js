const express = require("express");
const mongoose = require("mongoose");
const transactionSchemara = require("./transactionmodelschema");



module.exports = mongoose.model("Transaction", transactionSchema);
