const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	ingredients: {
		type: [String],
		required: true
	},
	carb: {
		type: Number,
		required: true
	},
	fat: {
		type: Number,
		required: true
	},
	protein: {
		type: Number,
		required: true
	},
	image: {
		type: String
	}
},
{
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
})

mealSchema.virtual("calories").get(function(){
	return this.carb * 4 + this.fat * 9 + this.protein * 4;
})

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;