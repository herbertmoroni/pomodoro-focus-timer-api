const mongoose = require('mongoose');
const PomodoroSession = require('./pomodoro-session.interface');

const sessionSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
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

// Convert Mongoose document to PomodoroSession interface
sessionSchema.methods.toSessionInterface = function() {
    return new PomodoroSession({
        sessionId: this._id,
        taskId: this.taskId,
        startTime: this.startTime,
        duration: this.duration,
        completed: this.completed,
        notes: this.notes,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    });
};

// Create PomodoroSession from interface
sessionSchema.statics.fromSessionInterface = function(sessionInterface) {
    return new this({
        taskId: sessionInterface.taskId,
        startTime: sessionInterface.startTime,
        duration: sessionInterface.duration,
        completed: sessionInterface.completed,
        notes: sessionInterface.notes,
    });
};

const PomodoroSessionModel = mongoose.model('PomodoroSession', sessionSchema);
module.exports = PomodoroSessionModel;