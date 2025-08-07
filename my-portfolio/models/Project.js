import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  technologies: {
    type: [String],
    required: [true, 'Please provide at least one technology'],
  },
  role: String,
  challenge: String,
  outcome: String,
  duration: String,
  year: String,
  imageUrl: String, // Kept for backward compatibility
  images: {
    type: [String],
    default: [],
  },
  videos: {
    type: [{
      url: String,
      title: String,
      thumbnail: String,
    }],
    default: [],
  },
  order: Number,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);