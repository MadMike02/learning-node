const mongoose = require('mongoose');
const slugify = require('slugify');

//schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual properties - will not get saved in db
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE (middleware on documents): runs before save() and create()
tourSchema.pre('save', function (next) {
  // this -- document that is currently going to save
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function(doc, next) {
//   // doc --- created document
//   next()
// })

//QUERY MIDDLEWARE/Hook -- before and after of some queries
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  // this ---- will be current query
  // /^find/ -- all the strings starting with find
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

//AGGREGATION MIDDLEWARE/HOOKs
tourSchema.pre('aggregate', function (next) {
  // this -- aggregate method
  console.log('aggregate', this);
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// tourSchema.post(/^find/, function (docs, next) {
//   docs --- queried documents
// console.log(`query took ${Date.now() - this.start} millisecond`);
//   next();
// });

//model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

//mongoose middleware - pre and post events
