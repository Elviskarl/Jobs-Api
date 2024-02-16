const userModel = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');

async function login(req,res){
  res.send('User has successfully logged in');
}

async function register(req,res){
 const user = await userModel.create({...req.body});
 res.status(StatusCodes.CREATED).json(user)
}

module.exports = {login,register}