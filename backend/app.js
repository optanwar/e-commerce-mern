const express = require('express')
const app = express()



app.use(express.json());




// Importing all routes

const products = require('./routes/productRoute');

app.use('/api/v1', products);



module.exports = app;
