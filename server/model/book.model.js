
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  BookName: { type: String, required: true },
  BookTitle: { type: String, required: true },
  Author: { type: String, default: "" },
  SellingPrice: { type: Number, required: true },
  PublishDate: { type: Date, default: null },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
module.exports = { Book };
