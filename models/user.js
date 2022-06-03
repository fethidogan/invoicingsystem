import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    company: { type: String, required: true },
    resetToken: { type: String },
    verifyToken: { type: String },
    verified: { type: Boolean, default: false },
    location: { type: String }
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;