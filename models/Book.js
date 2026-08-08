const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  isbn: { type: String },
  category: { type: String }, // e.g., "Science", "Mathematics"
  quantity: { type: Number, default: 1 },
  available: { type: Number, default: 1 },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

bookSchema.index({ title: 1, school: 1 });

module.exports = mongoose.model("Book", bookSchema);
