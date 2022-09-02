const express = require('express')
const app = express()

// handling different routes for tasks
const tasks = require('./routes/tasks')

// connect to the mongodb
const connectDB = require('./db/connect')

// for invalid url's
const notFound = require('./middlewares/not_found')

// to hide the mongodb_url connection string
require('dotenv').config()

// port to listen to
const PORT = process.env.PORT || 5000 //this means that we will be looking for any available port, if not the standard one will be 5000

// set the customErrorHandler for errors
const customErrorHandler = require('./middlewares/error_handle')



// middelwares
app.use(express.static('./public'))
app.use('/api/v1/tasks', tasks)
app.use('*', notFound)
app.use(customErrorHandler)

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)

        // setting the port the app listen to
        app.listen(PORT, console.log(`the app is running http://localhost:${PORT}`))

    } catch (error) {
        console.log(error);
    }
}

// starting 
start()
