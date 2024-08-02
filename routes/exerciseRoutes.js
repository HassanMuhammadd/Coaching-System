const express = require("express");
const {getMany, getOne, createOne, updateOne, deleteOne }=require("../controllers/commonController");
const Exercise=require("../models/exerciseModel");
const {roles}=require("../controllers/authController");

const exerciseRouter = express.Router();

exerciseRouter.get('/', getMany(Exercise));
exerciseRouter.get('/:id', getOne(Exercise));
exerciseRouter.post('/', createOne(Exercise));
exerciseRouter.patch('/:id', roles("Coach"), updateOne(Exercise));
exerciseRouter.delete('/:id', roles("Coach"),deleteOne(Exercise));

module.exports = exerciseRouter