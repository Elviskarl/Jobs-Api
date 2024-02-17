const userModel = require('../models/User');
const JWT = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/index');

async function auth(req,res,next){
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Invalid authentication');
  }
  const [Bearer,token] = authHeader.split(' ');
  try{
    const payload = JWT.verify(token,process.env.JWT_SECRET);
    req.user = {userId: payload.userId, name: payload.name}
    next();
  }catch(err){
    throw new UnauthenticatedError('Invalid authentication');
  }
}

module.exports = auth;