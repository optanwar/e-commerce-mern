const express = require('express')
const app = express()
const errorMiddleware = require('./middleware/error')


app.use(express.json());




// Importing all routes

const products = require('./routes/productRoute');

app.use('/api/v1', products);


// Middleware to handle errors
app.use(errorMiddleware);



module.exports = app;
