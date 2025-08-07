import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the client name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  role: {
    type: String,
    required: [true, 'Please provide the client role or company'],
    maxlength: [100, 'Role cannot be more than 100 characters'],
  },
  text: {
    type: String,
    required: [true, 'Please provide the testimonial text'],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  company: {
    type: String,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);