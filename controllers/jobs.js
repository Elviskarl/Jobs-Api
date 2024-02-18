const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors')

async function getJob(req,res){
  const {user:{userId},params:{id: jobId}} = req;
  const job = await Job.find({
    _id: jobId,
    createdById: userId
  });
  if(!job || job.length === 0){
    throw new NotFoundError(`There is no job with id : ${jobId}.`);
  }  
  res.status(StatusCodes.OK).json({job});
};

async function getAllJob(req,res){
  const jobs = await Job.find({}).sort('createdAt');
  res.status(StatusCodes.OK).json({jobs,count: jobs.length});
};

async function getMyJobs(req,res){
  const jobs = await Job.find({createdById: req.user.userId});
  res.status(StatusCodes.OK).json({jobs,count: jobs.length});

}

async function createJob(req,res){
  req.body.createdById = req.user.userId;
  req.body.createdByName = req.user.name;
  const job = await Job.create(req.body);  
  res.status(StatusCodes.CREATED).json(job);
};

async function updateJob(req,res){
  const {
    body:{company,position},
    user:{userId},
    params:{id:jobId}
  } = req;
  if(company === "" || position === "" && !company || !position){
    throw new BadRequestError('The company or position fields cannot be empty. Please provide relevant details')
  }
  const job = await Job.findOneAndUpdate(
    {_id: jobId,createdById: userId},
    req.body,
    {new:true,runValidators:true}
  );
  res.status(StatusCodes.OK).json({job});
};

async function deleteJob(req,res){
  const {user:{userId},params:{id:jobId}} =req;
  const job = await Job.findOneAndRemove(
    {_id: jobId, createdById: userId});
  if(!job){
    throw new NotFoundError(`Could not find the job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({job});
};

module.exports = {
  getJob,
  getAllJob,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs 
}