const {getMany, getOne, updateOne, deleteOne, createOne}=require("../controllers/commonController");
const express = require("express");
const Subscription =require("../models/subscriptionModel");

const subscriptionRouter = express.Router();

subscriptionRouter.get('/', getMany(Subscription));
subscriptionRouter.get('/:id', getOne(Subscription));
subscriptionRouter.post('/', createOne(Subscription));
subscriptionRouter.patch('/:id', updateOne(Subscription));
subscriptionRouter.delete('/:id', deleteOne(Subscription));

module.exports = subscriptionRouter;