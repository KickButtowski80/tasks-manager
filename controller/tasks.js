const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

//asyncWrapper is middleware
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({}).sort({ _id: -1 })
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})
const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        const error = new Error(`No task with id: ${taskID}`)
        error.status = 404
        return next(error)
        // return res.status(404).json({ msg: `No task with id: ${taskID}` })
    }
    res.status(200).json({ task })

})
const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const updatedTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!updatedTask) {
        res.status(404).json({ msg: `No task with id: ${taskID}` })
    }
    res.status(200).json({ updatedTask })
})
const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const deletedTask = await Task.findOneAndDelete({ _id: taskID })
    if (!deletedTask) {
        return res.status(404).json({ msg: `No task with id :${taskID}` })
    }
    res.status(200).json({ deletedTask })
})
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask

}