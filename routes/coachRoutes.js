const {getMany, getOne, updateOne, deleteOne, verifyOwnership }=require("../controllers/commonController");
const express = require("express");
const Coach=require("../models/coachModel");
const {signup, login,  protect}=require("../controllers/authController");

const coachRouter = express.Router();

coachRouter.post('/signup', signup("Coach"));
coachRouter.post('/login', login("Coach"));

coachRouter.get('/', protect, getMany(Coach));
coachRouter.get('/:id', getOne(Coach));
coachRouter.patch('/:id', protect, verifyOwnership(Coach), updateOne(Coach));
coachRouter.delete('/:id', protect, verifyOwnership(Coach), deleteOne(Coach));

module.exports = coachRouter;