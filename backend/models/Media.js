import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  type: {
    type: String,
  },
  src: {
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

export default mongoose.model("media", MediaSchema);
