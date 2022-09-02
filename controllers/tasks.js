const Task = require('../models/Task')
const asyncWrapper = require('../middlewares/asyncWrapper')
const customAPIErrorHandler = require('../errors/error')


const getAlltasks = asyncWrapper( async(req, res) =>{
    const tasks = await Task.find({})
    // find({}) returns a promise with all documents 
    res.status(200).json({success: true, tasks})
})


const postTask = asyncWrapper( async (req, res, next) =>{

    const task = await Task.create(req.body)

    // we create a document that has whatever the user has placed in the request's body
    res.status(201).json({success: true, task})
})


const updateTask = asyncWrapper( async (req, res, next) =>{
    const id = req.params.id

    const updatedTask = await Task.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true,
    })

    if(!updatedTask){
        return next(new customAPIErrorHandler("No task with the given Id", 404))
    }

    res.status(201).json({success: true, updatedTask})
  
})


const getOneTask = asyncWrapper( async (req, res, next) =>{
    const id = req.params.id

    const selectedTask = await Task.findById({_id: id})

    if(! selectedTask){
        console.log(3);
        return next(new customAPIErrorHandler("No task with the given Id", 404))
    }

    res.status(200).json({success: true, selectedTask})
        
})

const deleteTask = asyncWrapper( async (req, res, next) => {
    const id = req.params.id

    const selectedTask = await Task.findOneAndDelete({_id: id})        

    if(! selectedTask){
        return next(new customAPIErrorHandler("No task with the given Id", 404))
    }

    const tasks = await Task.find({})

    res.status(200).json({success: true, tasks})
})

module.exports= {
    getAlltasks,
    postTask,
    getOneTask,
    updateTask,
    deleteTask
}