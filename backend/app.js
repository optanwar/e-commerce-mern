const express = require('express');
const app = express();


const errorMiddleware= require('./middleware/error');

app.use(express.json());

// Route import 

const products = require('./routes/productsRoute');


app.use('/api/v1', products);

// middleware for error handling
app.use(errorMiddleware);

module.exports = app;