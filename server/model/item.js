var mongoose = require('mongoose');
var Schema = mongoose.Schema,ObjectId = Schema.ObjectId;

var itemSchema = new Schema({
    asin: String,
    productTitle: String,
    price: String,
    totalReview: Number,
    totalQuestion: Number,
    dateFirstAvailable: String,
    fiveStar: Number,
    fourStar: Number,
    threeStar: Number,
    twoStar: Number,
    oneStar: Number,
    dayOfYear: Number,
    createdTimeOnUtc: String,
    modifiedTimeOnUtc: String
});

module.exports = mongoose.model('Item', itemSchema);