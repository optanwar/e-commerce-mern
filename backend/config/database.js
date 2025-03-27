const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI).then(data => {
        console.log(`MongoDB Database connected with HOST: ${data.connection.host}`)
    });
}
module.exports = connectDatabase;