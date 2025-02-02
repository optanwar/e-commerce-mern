const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require("./middleware/error")
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cors());
app.use(cors(corsOptions));


// Route Imports 

const productRoutes = require("./routes/productRoute")
const userRoutes = require("./routes/userRoute")
const orderRoutes = require("./routes/orderRoute")


app.use("/api/v1", productRoutes)
app.use("/api/v1", userRoutes)
app.use("/api/v1", orderRoutes)

// Middleware for Error
app.use(errorMiddleware);














module.exports = app;