import mongoose, { Schema, Document } from 'mongoose';

export interface IAttachment {
  url: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface IReadReceipt {
  userId: Schema.Types.ObjectId;
  readAt: Date;
}

export interface IReaction {
  emoji: string;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface IChatMessage extends Document {
  content: string;
  sender: 'user' | 'assistant';
  userId?: Schema.Types.ObjectId;
  chatId: Schema.Types.ObjectId;
  timestamp: string;
  attachments?: IAttachment[];
  readBy?: IReadReceipt[];
  replyToMessageId?: Schema.Types.ObjectId;
  reactions?: IReaction[];
  createdAt: Date;
  updatedAt: Date;
}

const AttachmentSchema = new Schema<IAttachment>({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
}, { _id: false });

const ReadReceiptSchema = new Schema<IReadReceipt>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  readAt: { type: Date, default: Date.now },
}, { _id: false });

const ReactionSchema = new Schema<IReaction>({
  emoji: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    content: { type: String, default: '', trim: true },
    sender: { type: String, enum: ['user', 'assistant'], required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    timestamp: { type: String, required: true },
    attachments: { type: [AttachmentSchema], default: [] },
    readBy: { type: [ReadReceiptSchema], default: [] },
    replyToMessageId: { type: Schema.Types.ObjectId, ref: 'ChatMessage', default: null },
    reactions: { type: [ReactionSchema], default: [] },
  },
  { timestamps: true }
);

ChatMessageSchema.index({ chatId: 1 });
ChatMessageSchema.index({ createdAt: -1 });
ChatMessageSchema.index({ userId: 1 });
ChatMessageSchema.index({ content: 'text' });
ChatMessageSchema.index({ chatId: 1, createdAt: -1 });

const ChatMessage = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatMessage;

