const express = require("express");
const mongoose = require("mongoose");
const coachRouter=require("./routes/coachRoutes");
const exerciseRouter=require("./routes/exerciseRoutes");
const mealRouter=require("./routes/mealRoutes");
const subscriptionRouter=require("./routes/subscriptionRoutes");
const reviewRouter=require("./routes/reviewRoutes");
const globalErrorHandler=require("./utils/globalErrorHandler");
const userRouter=require("./routes/userRoutes");
const {protect}=require("./controllers/authController");

const app = express();

app.use(express.json());

app.use('/coaches',coachRouter)
app.use('/users', userRouter);
app.use('/exercises', protect, exerciseRouter);
app.use('/meals', protect, mealRouter);
app.use('/subscriptions', protect, subscriptionRouter);
app.use('/reviews', protect, reviewRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({ status: "error", data: { msg: "URL not found" } })
})

app.use(globalErrorHandler)



mongoose.connect('mongodb://localhost:27017/coaching-system')
	.then(()=> console.log('Connected!'));

app.listen(4000, () =>{
	console.log('Listening on port 4000')
})
