


const express = require('express')
const app = express()
const dotenv = require("dotenv");

const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error')
const cors = require('cors');


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.1.6:5173'],
    credentials: true,
  }));

  
  // Setting up config file
  dotenv.config({ path: "backend/config/config.env" });



// Importing all routes

const productsRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');

app.use('/api/v1', productsRoute);
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// Middleware to handle errors
app.use(errorMiddleware);



module.exports = app;
