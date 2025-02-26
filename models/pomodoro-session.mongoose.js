const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        default: 1500
    },
    completed: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Add custom validation method
sessionSchema.methods.validateSession = function() {
    if (!this.taskId) {
        throw new Error('Task ID is required');
    }
};

const PomodoroSessionModel = mongoose.model('PomodoroSession', sessionSchema);
module.exports = PomodoroSessionModel;