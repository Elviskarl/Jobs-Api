const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide the company name'],
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending'
  },
  createdById: {
    type: mongoose.Types.ObjectId,
    ref: 'userModel',
    required: [true, 'please provide user']
  },
  createdByName:{
    type: String,
    required: [true, 'Please provide name']
  }
},
{timestamps:true}
);

module.exports = mongoose.model('Job',jobSchema);