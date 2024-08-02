const mongoose = require("mongoose");
const Review=require("./reviewModel");
const validator = require("validator");

const coachSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	avatar: {
		type: String
	},
	averageRating: {
		type: Number,
		default: 0,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [ validator.isEmail, "Please enter a valid email"],
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	reviews: Array,
})


coachSchema.pre('save', async function(next){
	const reviewsPromises = this.reviews.map(async id => {
		await Review.findById(id);
	})
	this.reviews = await Promise.all(reviewsPromises);
	next();
})


const Coach = mongoose.model("Coach", coachSchema)
module.exports = Coach;