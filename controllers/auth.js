const userModel = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors/index')

async function login(req,res){
  const {name,email,password} = req.body;
  if(!name || !email || !password){
    throw new BadRequestError('Please provide name, email and password');
  }

  const registeredUser = await userModel.findOne({email});
  
  if(!registeredUser){
    throw new UnauthenticatedError('Invalid email credentials');
  }
  const passwordMatched = await registeredUser.checkPassword(password);

  if(!passwordMatched){
    throw new UnauthenticatedError('Invalid password credentials');
  }
  
  const token = registeredUser.createJWT();
    res.status(StatusCodes.OK).json({name: registeredUser.name, token});
}

async function register(req,res){
 const user = await userModel.create({...req.body});
 const token = user.createJWT();
 res.status(StatusCodes.CREATED).json({name:user.name,token})
}

module.exports = {login,register}