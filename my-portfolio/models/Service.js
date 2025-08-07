import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a service title'],
    maxlength: [100, 'Service title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  icon: {
    type: String,
    required: [true, 'Please provide an icon'],
  },
  order: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);