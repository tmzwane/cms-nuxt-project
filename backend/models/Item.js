import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  item_type: {
    type: String,
  },
  slug: {
    type: String,
  },
  locale: {
    type: Schema.Types.ObjectId,
    ref: "locale",
  },
  creator: {
    type: String,
  },
  media: {
    type: Schema.Types.ObjectId,
    ref: "media",
  },
  content: {
    type: Schema.Types.ObjectId,
    ref: "content",
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("items", ItemsSchema);
