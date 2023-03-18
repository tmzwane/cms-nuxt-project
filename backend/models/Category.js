const mongoose = require("mongoose");
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

module.exports = mongoose.model("categories", CategorySchema);
