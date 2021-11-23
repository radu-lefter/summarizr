const mongoose = require("mongoose");
const slugify = require('slugify');

const SummarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  author: {
    type: String,
    required: [true, "Please add an author name"],
    trim: true,
    maxlength: [100, "Author name can not be more than 50 characters"],
  },
  publicationDate: {
    type: String,
    required: [true, "Please add a long summary"],
  },
  slug: String,
  shortSum: {
    type: String,
    required: [true, "Please add a short summary"],
    maxlength: [500, "Summary can not be more than 500 characters"],
  },
  longSum: {
    type: String,
    required: [true, "Please add a long summary"],
  },
  genre: {
    // Array of strings
    type: [String],
    enum: [
      'Fiction',
      'Romance',
      'Self Help',
      'Computer Science',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create summary slug from the name
SummarySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Summary", SummarySchema);
