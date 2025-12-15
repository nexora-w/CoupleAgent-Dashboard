import mongoose, { Schema, Document } from 'mongoose';

export interface ICouple extends Document {
  coupleName: string;
  user1Id: mongoose.Types.ObjectId;
  user2Id?: mongoose.Types.ObjectId;
  user1Name: string;
  user2Name: string;
  partnerEmail?: string;
  status: 'pending' | 'active' | 'inactive';
  invitationToken?: string;
  invitationExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CoupleSchema = new Schema<ICouple>(
  {
    coupleName: { type: String, required: true, trim: true },
    user1Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    user2Id: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    user1Name: { type: String, required: true, trim: true },
    user2Name: { type: String, required: true, trim: true },
    partnerEmail: { type: String, lowercase: true, trim: true, default: null },
    status: { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' },
    invitationToken: { type: String, default: null },
    invitationExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

CoupleSchema.index({ user1Id: 1 });
CoupleSchema.index({ user2Id: 1 });
CoupleSchema.index({ invitationToken: 1 });
CoupleSchema.index({ partnerEmail: 1 });

const Couple = mongoose.models.Couple || mongoose.model<ICouple>('Couple', CoupleSchema);

export default Couple;

