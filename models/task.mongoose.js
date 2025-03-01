const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    totalTimeSpent: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    defaultDuration: {
        type: Number,
        default: 1500  // 25 minutes in seconds
    },
    userId: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;