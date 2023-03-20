import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  slug: {
    type: String,
  },
  path: {
    type: String,
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  ancestor_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
  locale: {
    type: Schema.Types.ObjectId,
    ref: "locale",
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

// To use with virtual populate to query parent details
CategorySchema.virtual("parent", {
  ref: "categories",
  localField: "parent_id",
  foreignField: "_id",
});

// To use with virtual populate to query ancestors' details
CategorySchema.virtual("ancestors", {
  ref: "categories",
  localField: "ancestor_ids",
  foreignField: "_id",
});

export default mongoose.model("categories", CategorySchema);
