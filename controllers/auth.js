const userModel = require('../models/User');
const {StatusCodes} = require('http-status-codes');
async function login(req,res){
  res.send('User has successfully logged in');
}

async function register(req,res){
 const user = await userModel.create({...req.body});
 const token = user.createJWT();
 res.status(StatusCodes.CREATED).json({name:user.name,token})
}

module.exports = {login,register}