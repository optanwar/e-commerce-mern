const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error')


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// Importing all routes

const productsRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');

app.use('/api/v1', productsRoute);
app.use("/api/v1", userRoute)

// Middleware to handle errors
app.use(errorMiddleware);



module.exports = app;
