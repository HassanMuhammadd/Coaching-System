const {getMany, getOne, updateOne, deleteOne, createOne}=require("../controllers/commonController");
const express = require("express");
const Meal =require("../models/mealModel");
const {roles}=require("../controllers/authController");

const mealRouter = express.Router();

mealRouter.get('/', getMany(Meal));
mealRouter.get('/:id', getOne(Meal));
mealRouter.post('/', createOne(Meal));
mealRouter.patch('/:id', roles("Coach"), updateOne(Meal));
mealRouter.delete('/:id', roles("Coach"),deleteOne(Meal));

module.exports = mealRouter;