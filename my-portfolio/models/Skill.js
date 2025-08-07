import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a skill name'],
    maxlength: [50, 'Skill name cannot be more than 50 characters'],
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'other'],
    default: 'other',
  },
  icon: {
    type: String,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);