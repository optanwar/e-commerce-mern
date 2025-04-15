


const express = require('express')
const app = express()

const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error')
const cors = require('cors');


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true,
  }));



// Importing all routes

const productsRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');

app.use('/api/v1', productsRoute);
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute);

// Middleware to handle errors
app.use(errorMiddleware);



module.exports = app;
