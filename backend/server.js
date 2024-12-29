const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

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

app.listen(process.env.PORT, (res,req) =>{

    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});



// unhandlex promise rejection

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    })
})