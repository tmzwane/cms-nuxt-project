const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocaleSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  summary: {
    type: String,
  },
  seo_title: {
    type: String,
  },
  seo_description: {
    type: String,
  },
  seo_summary: {
    type: String,
  },
  use_seo_values: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("locale", LocaleSchema);
