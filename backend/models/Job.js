const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Applied', 'Shortlisted', 'Rejected', 'Accepted'],
      default: 'Applied',
    },
    dateApplied: {
      type: Date,
      required: [true, 'Date applied is required'],
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
