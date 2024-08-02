const {getMany, getOne, updateOne, createOne, verifyUser}=require("../controllers/commonController");
const express = require("express");
const Review =require("../models/reviewModel");

const reviewRouter = express.Router();

reviewRouter.get('/', getMany(Review));
reviewRouter.get('/:id', getOne(Review));
reviewRouter.post('/', createOne(Review));
reviewRouter.patch('/:id', updateOne(Review));

module.exports = reviewRouter;