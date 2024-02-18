const express = require('express');
const router = express.Router();
const {getJob,getAllJob,createJob,updateJob,deleteJob,getMyJobs} = require('../controllers/jobs');

router.get('/',getAllJob);
router.get('/mine',getMyJobs);
router.post('/',createJob);
router.get('/:id',getJob);
router.patch('/:id',updateJob);
router.delete('/:id',deleteJob);

module.exports = router;