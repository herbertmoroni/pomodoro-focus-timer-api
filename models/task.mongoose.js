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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Add custom validation method
taskSchema.methods.validateTask = function() {
    if (!this.taskName) {
        throw new Error('Task name is required');
    }
};

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;