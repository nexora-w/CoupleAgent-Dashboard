import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  title: string;
  agentId: Schema.Types.ObjectId;
  lastMessage: string;
  isActive: boolean;
  initialPrompt?: string;
  shareToken?: string;
  sharedUsers?: string[];
  messages: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    title: { type: String, required: true, trim: true },
    agentId: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
    lastMessage: { type: String, default: 'Start a conversation...', trim: true },
    isActive: { type: Boolean, default: false },
    initialPrompt: { type: String, trim: true },
    shareToken: { type: String, trim: true, unique: true, sparse: true },
    sharedUsers: { type: [String], default: [] },
    messages: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }],
  },
  { timestamps: true }
);

ChatSchema.index({ agentId: 1 });
ChatSchema.index({ isActive: 1 });
ChatSchema.index({ createdAt: -1 });
ChatSchema.index({ shareToken: 1 });

const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;

