const mongoose = require('mongoose');
const slugify = require('slugify');


const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An event must have a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'An event name must have less or equal then 50 characters'],
        minlength: [5, 'An event name must have more or equal then 5 characters']
    },
    slug: String,
    venue: {
        type: String,
        required: [true, 'An event must have a venue'],
    },
    address: {
        type: String,
        required: [true, 'An event must have an address'],
    },
    performers: {
        type: String,
        required: [true, 'An event must have performers'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'An event must have a description']
    },
    date: {
        type: Date,
        required: [true, 'An event must have a date']
    },
    image: {
        type: String,
        required: [true, 'An event must have a cover image']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    secretEvent: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
});


// add a document middleware to the schema(pre) to generate a slug
eventSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// add a query middleware to filter secret tours
eventSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    next();
});

// add an aggregate middleware to filter secret tours
eventSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretEvent: { $ne: true } } });
    next();
});


// add a document middleware to the schema(post)
eventSchema.post('save', function (doc, next) {
    // console.log(doc);
    next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;