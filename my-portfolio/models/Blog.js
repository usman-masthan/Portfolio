import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post'],
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this blog post'],
    unique: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this blog post'],
  },
  coverImage: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  tags: {
    type: [String],
    default: [],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    name: {
      type: String,
      default: 'Ahamed Usman',
    },
    image: {
      type: String,
      default: '',
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);