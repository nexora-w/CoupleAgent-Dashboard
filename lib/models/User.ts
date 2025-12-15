import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
  coupleId?: mongoose.Types.ObjectId;
  role: 'user' | 'partner';
  isVerified: boolean;
  subscription: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: null },
    coupleId: { type: Schema.Types.ObjectId, ref: 'Couple', default: null },
    role: { type: String, enum: ['user', 'partner'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    subscription: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ coupleId: 1 });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

