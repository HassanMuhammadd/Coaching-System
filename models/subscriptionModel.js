const mongoose = require("mongoose");
const Coach=require("./coachModel");

const subscriptionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	Coach: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Coach'
	},
	price: {
		type: Number,
		required: true
	},
	durationInMonths: {
		type: Number,
		required: true
	},
	workoutPlan: [{
		day: Number,
		Exercise: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Exercise'
		},
	}],
	dietPlan: [{
		meal: Number,
		Meal: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Meal'
		},
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
})

subscriptionSchema.pre(/^find/, function(next){
	this.populate({
		path: 'Coach',
		select: 'name'
	})
	.populate({
		path: 'user',
		select: 'name'
	})
	.populate({
		path: 'workoutPlan.Exercise',
	})
	.populate({
		path: 'dietPlan.Meal',
	})
	next()
})

subscriptionSchema.pre('save',async function(next){
	const coach = await Coach.findById(this.Coach);
	this.price = coach.price * this.durationInMonths;
	next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;