const express = require('express');

const app = express();
const errorMiddleware = require("./middleware/error")



app.use(express.json());

// Route Imports 

const productRoutes = require("./routes/productRoute")
const userRoutes = require("./routes/userRoute")

app.use("/api/v1", productRoutes)
app.use("/api/v1", userRoutes)

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;