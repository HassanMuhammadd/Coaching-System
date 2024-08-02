const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	weight: {
		type: Number,
		required: true
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
		select: false
	},
	avatar: {
		type: String
	}
})

const User = mongoose.model("User", userSchema);
module.exports = User