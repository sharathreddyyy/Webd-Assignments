const Joi = require('joi');
const Job = require('../models/Job');

const createJobSchema = Joi.object({
  companyName: Joi.string().trim().required(),
  jobTitle:    Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  salary:      Joi.number().positive().required()
});

// POST /create/job
exports.createJob = async (req, res) => {
  try {
    const { error, value } = createJobSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    const job = await Job.create({
      ...value,
      createdBy: req.user ? req.user.id : null
    });

    return res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (err) {
    console.error('Create job error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET /jobs
exports.getJobs = async (_req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json({ jobs });
  } catch (err) {
    console.error('Get jobs error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};