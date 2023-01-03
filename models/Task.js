const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        minLength: [5, 'name can not be less tahn 5 chars'],
        maxLength: [20, 'name can not be more than 20 chars']
    },
    completed: {
        type: Boolean,
        default:false,
    },
})

module.exports = mongoose.model('Task', TaskSchema)