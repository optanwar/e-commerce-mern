const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require("./middleware/error")
const cors = require('cors');


// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173',  // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }));
 

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
// Or enable CORS for specific origins
app.use(cors({
    origin: 'http://localhost:5173'  // Your frontend URL
  }));

 // Increase the payload limit to 10MB

// Use body-parser middleware with increased limits
app.use(bodyParser.json({ limit: '10mb' }));  // For JSON payloads
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));  // For URL-encoded data

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