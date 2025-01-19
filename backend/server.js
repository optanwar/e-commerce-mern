const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


const cloudinary = require('cloudinary');
//handling uncaught exception


process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
})         






//config 

dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase();


   // Configuration
   cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET_KEY 
});




app.listen(process.env.PORT, (res,req) =>{

    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});



// unhandlex promise rejection

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejr');
    server.close(() => {
        process.exit(1);
    })
})