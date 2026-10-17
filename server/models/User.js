import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    title: {
      type: String,
      default: 'Employee',
      trim: true,
    },
    company: {
      type: String,
      default: 'Company not set',
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for display name
userSchema.virtual('displayName').get(function () {
  return this.fullName || `${this.firstName || ''} ${this.lastName || ''}`.trim() || this.username || 'Employee';
});

export const User = mongoose.model('User', userSchema);
