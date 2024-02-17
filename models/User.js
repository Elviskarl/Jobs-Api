const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 18,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    minlength: 5,
    trim: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide the password'],
    minlength: [6, 'The password should be more than 6 characters']
  }
});
userSchema.pre('save',async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
});
userSchema.methods.createJWT = function(){
  return JWT.sign({
    userId: this._id,
    name: this.name
  },process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFESPAN})
}
userSchema.methods.checkPassword = async function(pass){
  const isMatch = await bcrypt.compare(pass,this.password);
  return isMatch;
}

module.exports = mongoose.model('user',userSchema);