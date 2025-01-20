const app = require('./app');
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")


















// Handle Uncaught Exception
process.on('uncaughtException', err => {
    console.log('ERROR: ', err.message)
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})
//config
dotenv.config({path:"backend/config/config.env"});




// connecting to Database 

connectDatabase()
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})


// Unhandled Promise Rejection

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥', err.name, err.message)
    console.log('Shutting down...')
    server.close(() => {
        process.exit(1)
    })
});