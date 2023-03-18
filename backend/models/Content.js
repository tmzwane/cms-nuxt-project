import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  src: {
    type: String,
  },
  extension: {
    type: String,
  },
  text: {
    type: String,
  },
  quality: {
    type: String,
  },
  size: {
    type: String,
  },
  size_unit: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("content", ContentSchema);
