import mongoose, { Schema, Document } from 'mongoose';

export interface IAgent extends Document {
  title: string;
  emoji: string;
  description: string;
  prompt: string;
  coupleId: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  isDefault: boolean;
  shareToken?: string;
  sharedUsers?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AgentSchema = new Schema<IAgent>(
  {
    title: { type: String, required: true, trim: true },
    emoji: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    prompt: { type: String, required: true, trim: true },
    coupleId: { type: Schema.Types.ObjectId, ref: 'Couple', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDefault: { type: Boolean, default: false },
    shareToken: { type: String, trim: true, unique: true, sparse: true },
    sharedUsers: { type: [String], default: [] },
  },
  { timestamps: true }
);

AgentSchema.index({ coupleId: 1 });
AgentSchema.index({ createdBy: 1 });
AgentSchema.index({ isDefault: 1 });
AgentSchema.index({ shareToken: 1 });

const Agent = mongoose.models.Agent || mongoose.model<IAgent>('Agent', AgentSchema);

export default Agent;

