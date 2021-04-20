import mongoose from "mongoose";

const CommentSchema = new mongoos.Schema({
  Text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
