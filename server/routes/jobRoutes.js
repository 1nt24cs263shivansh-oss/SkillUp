import express from 'express';
import { MOCK_JOBS } from '../data/mockData.js';

const router = express.Router();

// Get all jobs
router.get('/', (req, res) => {
  // Replace: const jobs = await Job.find();
  return res.json({ jobs: MOCK_JOBS });
});

// Get a single job by ID
router.get('/:id', (req, res) => {
  const job = MOCK_JOBS.find(j => j._id === req.params.id);
  
  if (!job) {
    return res.status(404).json({ message: 'Opportunity not found' });
  }
  
  return res.json({ job });
});

export default router;