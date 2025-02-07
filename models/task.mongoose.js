// models/task.mongoose.js
const mongoose = require('mongoose');
const Task = require('./task.interface');

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
    }
}, {
    timestamps: true
});

// Convert Mongoose document to Task interface
taskSchema.methods.toTaskInterface = function() {
    return new Task({
        taskId: this._id,
        taskName: this.taskName,
        description: this.description,
        totalTimeSpent: this.totalTimeSpent,
        category: this.category,
        isActive: this.isActive,
        defaultDuration: this.defaultDuration,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    });
};

// Create Task from interface
taskSchema.statics.fromTaskInterface = function(taskInterface) {
    return new this({
        taskId: taskInterface.taskId,
        taskName: taskInterface.taskName,
        description: taskInterface.description,
        totalTimeSpent: taskInterface.totalTimeSpent,
        category: taskInterface.category,
        isActive: taskInterface.isActive,
        defaultDuration: taskInterface.defaultDuration,
    });
};

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;