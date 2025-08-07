import mongoose from 'mongoose';

const FooterSchema = new mongoose.Schema({
  copyright: {
    type: String,
    required: [true, 'Please provide copyright text'],
  },
  socialLinks: [{
    platform: {
      type: String,
      required: [true, 'Please provide a social platform name'],
    },
    url: {
      type: String,
      required: [true, 'Please provide a social link URL'],
    },
    icon: {
      type: String,
      required: [true, 'Please provide an icon name'],
    },
  }],
  links: [{
    label: {
      type: String,
      required: [true, 'Please provide a link label'],
    },
    href: {
      type: String,
      required: [true, 'Please provide a link URL'],
    },
  }],
  credits: {
    type: String,
    default: '',
  },
});

export default mongoose.models.Footer || mongoose.model('Footer', FooterSchema);