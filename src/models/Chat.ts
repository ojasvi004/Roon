import mongoose, { Document, model, Model } from "mongoose";

interface IChat extends Document {
  members: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  isGroup: boolean;
  name: string;
  groupPhoto: string;
  createdAt: Date;
  lastMessageAt: Date;
}

const ChatSchema: mongoose.Schema<IChat> = new mongoose.Schema({
  members: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  messages: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    default: [],
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  groupPhoto: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
});
const Chat: Model<IChat> = mongoose.models.Chat || model<IChat>("Chat", ChatSchema);
export default Chat;
