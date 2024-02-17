const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors')

async function getJob(req,res){
  res.send('Get a job');
};

async function getAllJob(req,res){
  res.send('Get all jobs');
};

async function createJob(req,res){
  req.body.createdById = req.user.userId;
  req.body.createdByName = req.user.name;
  const job = await Job.create(req.body);  
  res.status(StatusCodes.CREATED).json(job);
};

async function updateJob(req,res){
  res.send('edit job');
};

async function deleteJob(req,res){
  res.send('Remove a job');
};

module.exports = {
  getJob,
  getAllJob,
  createJob,
  updateJob,
  deleteJob  
}