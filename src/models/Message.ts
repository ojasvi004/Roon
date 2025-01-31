import mongoose from "mongoose";
import { Schema, Document, Types } from "mongoose";

interface IMessage extends Document {
  chat: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
  photo: string;
  createdAt: Date;
  seenBy: Types.ObjectId[];
}

const MessageSchema: Schema<IMessage> = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seenBy: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
});
const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
