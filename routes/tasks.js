const express = require('express')
const router = express.Router()

const {
    getAlltasks,
    postTask,
    getOneTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')


// parse the data to handle POST request
router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.route('/').get(getAlltasks).post(postTask)
router.route('/:id').get(getOneTask).patch(updateTask).delete(deleteTask)


module.exports = router