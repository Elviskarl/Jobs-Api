async function getJob(req,res){
  res.send('Get a job');
};

async function getAllJob(req,res){
  res.send('Get all jobs');
};

async function createJob(req,res){
  res.send('Create a new job');
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