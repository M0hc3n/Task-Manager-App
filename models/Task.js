const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'you must provide a name'],
        trim: true,
        maxlength: [20, 'name cannot excede 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)

// what we did in here is that we create the basic structure of our document (ps: document is a single element of our collection in mongoDB)
// then we give it "Task" as a name and we will be passing it to the place where we will be instantiating new Tasks
// that is to say postTask method in controllers folder
