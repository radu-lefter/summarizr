const mongoose = require("mongoose");

const TranslationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim:true,
    required: [true, "Please add a name"],
  },
  author: {
    type: String,
    required: [true, "Please add an author name"],
  },
  language: String,
  shortSum: {
    type: String,
    required: [true, "Please add a short summary"],
    maxlength: [500, "Summary can not be more than 500 characters"],
  },
  longSum: {
    type: String,
    required: [true, "Please add a long summary"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  summary: {
    type: mongoose.Schema.ObjectId,
    ref: 'Summary',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});



module.exports = mongoose.model("Translation", TranslationSchema);
