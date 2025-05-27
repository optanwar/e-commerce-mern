


const express = require('express')
const app = express()

const path = require('path');

const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error')
const cors = require('cors');


  // // Setting up config file
  // dotenv.config({ path: "backend/config/config.env" });

  // Setting up config file
if(process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
  // dotenv.config({ path: "backend/config/config.env" });
}

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.1.6:5173'],
    credentials: true,
  }));

  



// Importing all routes

const productsRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');

app.use('/api/v1', productsRoute);
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);


app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


// Middleware to handle errors
app.use(errorMiddleware);



module.exports = app;
