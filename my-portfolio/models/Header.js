import mongoose from 'mongoose';

const HeaderSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: [true, 'Please provide a logo text or image URL'],
  },
  navigation: [{
    label: {
      type: String,
      required: [true, 'Please provide a navigation label'],
    },
    href: {
      type: String,
      required: [true, 'Please provide a navigation URL'],
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
  }],
  ctaButton: {
    label: {
      type: String,
      required: [true, 'Please provide a CTA button label'],
    },
    href: {
      type: String,
      required: [true, 'Please provide a CTA button URL'],
    },
  },
});

export default mongoose.models.Header || mongoose.model('Header', HeaderSchema);