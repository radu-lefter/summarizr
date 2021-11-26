const mongoose = require("mongoose");
const slugify = require('slugify');

const SummarySchema = new mongoose.Schema({
  title: {
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
    required: [true, "Please add a year"],
  },
  language: String,
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

// Cascade delete translations when a summary is deleted
SummarySchema.pre('remove', async function(next) {
  console.log(`translations being removed from summary ${this._id}`);
  await this.model('Translation').deleteMany({ summary: this._id });
  next();
});

// Reverse populate with virtuals
SummarySchema.virtual('translations', {
  ref: 'Translation',
  localField: '_id',
  foreignField: 'summary',
  justOne: false
});

// Create summary slug from the name
SummarySchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Summary", SummarySchema);
