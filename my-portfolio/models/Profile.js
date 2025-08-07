import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  title: {
    type: String,
    required: [true, 'Please provide your professional title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  tagline: {
    type: String,
    required: [true, 'Please provide a tagline'],
    maxlength: [200, 'Tagline cannot be more than 200 characters'],
  },
  about: {
    type: String,
    required: [true, 'Please provide about information'],
  },
  journey: {
    type: String,
    required: [true, 'Please provide journey information'],
  },
  availability: {
    type: String,
    required: [true, 'Please provide availability information'],
  },
  profileImage: {
    type: String,
    required: [true, 'Please provide a profile image URL'],
  },
  contactCTA: {
    type: String,
    required: [true, 'Please provide contact CTA text'],
  },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);