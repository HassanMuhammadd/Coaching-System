const {getMany, getOne, deleteOne, verifyOwnership, updateOne }=require("../controllers/commonController");
const express = require("express");
const User =require("../models/userModel");
const {signup, login, protect}=require("../controllers/authController");

const userRouter = express.Router();

userRouter.get('/', protect, getMany(User));
userRouter.get('/:id', protect, verifyOwnership(User), getOne(User));
userRouter.patch('/:id', protect, verifyOwnership(User), updateOne(User));
userRouter.delete('/:id', protect, verifyOwnership(User), deleteOne(User));
userRouter.post('/signup', signup("User"))
userRouter.post('/login', login("User"))

module.exports = userRouter;