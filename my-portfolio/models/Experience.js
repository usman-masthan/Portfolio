import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'Please provide a role title'],
    maxlength: [100, 'Role title cannot be more than 100 characters'],
  },
  company: {
    type: String,
    required: [true, 'Please provide a company name'],
    maxlength: [100, 'Company name cannot be more than 100 characters'],
  },
  period: {
    type: String,
    required: [true, 'Please provide a time period'],
    maxlength: [50, 'Period cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);