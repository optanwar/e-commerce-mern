const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const bodyParser = require('body-parser');
const fileUopload = require('express-fileupload')

const errorMiddleware= require('./middleware/error');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUopload());
// Route import 

const products = require('./routes/productsRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use('/api/v1', products);
app.use('/api/v1', user);
app.use('/api/v1', order);

// middleware for error handling
app.use(errorMiddleware);

module.exports = app;