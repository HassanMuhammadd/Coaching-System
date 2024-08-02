const mongoose = require("mongoose");
const Coach=require("./coachModel");

const reviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	coach: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Coach"
	},
	text: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	createdAt: {
		type: Date,
		default: Date.now,
		select: false
	},

})

reviewSchema.pre(/^find/, function(next){
	this.populate({
		path: "user",
		select: "name"
	}).populate({
		path: "coach",
		select: "name"
	})
	next();
})

reviewSchema.statics.calcCoachAvgRating = async function(coachID){
	const stats = await this.aggregate([
		{
			$match: { coach: coachID }
		},
		{
			$group: {
				_id: "$coach",
				nRating: { $sum: 1 },
				avgRating: { $avg: "$rating" }
			}
		}
	])

	if(stats.length)
	{
		await Coach.findByIdAndUpdate(coachID, {
			averageRating: stats[0].avgRating
		})
	}
}

reviewSchema.post("save", function(){
	this.constructor.calcCoachAvgRating(this.coach)
})

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;