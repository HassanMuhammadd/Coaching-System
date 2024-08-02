const express = require("express");
const {promisify} = require("util");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Coach=require("../models/coachModel");
require('dotenv').config()

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "1d"
	})
}

const signup = (Model) => asyncHandler(async (req, res, next) => {

	const password = await bcrypt.hash(req.body.password, 10);

	let newAccount;
	if(Model === 'User')
		newAccount = await User.create({
		name: req.body.name,
		email: req.body.email,
		password,
		age: req.body.age,
		weight: req.body.weight,
		avatar: req.body.avatar
	});
	else
		newAccount = await Coach.create({
		name: req.body.name,
		email: req.body.email,
		password,
		description: req.body.description,
		price: req.body.price,
		avatar: req.body.avatar
	});

	const token = signToken(newAccount._id);

	return res.status(201).json({
		status: "success",
		token,
		data: newAccount
	})
})

const login = (Model) => asyncHandler(async (req, res, next) => {
	const {email,password} = req.body;
	if(!email || !password)
		return next(new AppError("Please provide email and password", 400));

	let user;
	if(Model === 'User')
		user = await User.findOne({email}).select("+password");
	else
		user = await Coach.findOne({email}).select("+password");

	const isCorrect = await bcrypt.compare(password, user.password);
	if(!isCorrect)
		return next(new AppError("Incorrect email or password", 401));

	const token = signToken(user._id);

	return res.status(200).json({
		status: "success",
		token
	})
})

const protect = asyncHandler(async (req, res, next) => {

	let token;
	if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
		token = req.headers.authorization.split(' ')[1];
	if(!token)
		return next(new AppError("unauthorized", 401));

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	let acc = await User.findById(decoded.id);
	let role = 'User';
	if(!acc)
	{
		acc = await Coach.findById(decoded.id);
		role = 'Coach';
	}

	if(!acc)
		return next(new AppError("unauthorized", 401));
	req.user = {...acc, role};
	next();
})

const roles = (...roles) => {
	return (req, res, next) =>{
		if(!roles.includes(req.user.role))
			return next(new AppError("unauthorized", 401));
		next();
}}

module.exports = {
	signup,
	login,
	protect,
	roles
}