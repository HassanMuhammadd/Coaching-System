const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/appError')
const bcrypt = require('bcryptjs')

const getMany = (Model) => asyncHandler(async(req, res, next)=> {
	const doc = await Model.find();
	return res.status(200).json({
		status: 'success',
		data: doc
	})
});

const getOne = (Model) => asyncHandler(async(req, res, next)=>{
	const doc = await Model.findById(req.params.id);

	if(!doc)
		return next(new AppError(`No ${Model.modelName} found with that ID`, 404));

	return res.status(200).json({
		status: 'success',
		data: doc
	})
})

const createOne = (Model) => asyncHandler(async(req, res, next)=>{
	const doc = await Model.create(req.body);

	res.status(201).json({
		status: 'success',
		data: doc
	})
})

const updateOne = (Model) => asyncHandler(async(req, res, next)=>{
	if(req.body.password)
		req.body.password = await bcrypt.hash(req.body.password, 10);

	const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if(!doc)
		return next(new AppError(`No ${Model.modelName} found with that ID`, 404));

	return res.status(200).json({
		status: 'success',
		data: doc
	})
})

const deleteOne = (Model) =>asyncHandler(async(req, res, next)=>{
	const doc = await Model.findByIdAndDelete(req.params.id);

	if(!doc)
		return next(new AppError(`No ${Model.modelName} found with that ID`, 404));

	return res.status(204).json({
		status: 'success',
		data: "Deleted"
	})
})

const verifyOwnership = (Model) => asyncHandler(async(req, res, next)=>{
	const doc = await Model.findById(req.params.id);
	if(!doc)
		return next(new AppError(`No ${Model.modelName} found with that ID`, 404));
	next();
})

module.exports = {
	getMany,
	getOne,
	createOne,
	updateOne,
	deleteOne,
	verifyOwnership,
	verifyUser
}