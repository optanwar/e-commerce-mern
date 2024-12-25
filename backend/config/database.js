const mongoose = require('mongoose');



const connectDatabase= ()=>{
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true,}).then((data)=>{
        console.log(`Database connected successfully with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.log(`Database connection error: ${err.message}`);
    });
    
}

module.exports = connectDatabase;