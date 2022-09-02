const mongoose = require('mongoose')

const connectDB = (urlConnection) =>{
    return mongoose.connect(urlConnection)    
}

module.exports = connectDB