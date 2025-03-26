const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     
    }).then(data => {
        console.log(`MongoDB Database connected with HOST: ${data.connection.host}`)
    }).catch(err => {
        console.log(err);
    })
}
module.exports = connectDatabase;