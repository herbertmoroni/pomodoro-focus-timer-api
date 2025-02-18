class PomodoroSession {
    constructor(data = {}) {
        this.sessionId = data.sessionId;
        this.taskId = data.taskId;
        this.startTime = data.startTime || new Date();
        this.duration = data.duration || 1500; // 25 minutes default
        this.completed = data.completed || false;
        this.notes = data.notes || '';
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    validate() {
        if (!this.taskId) {
            throw new Error('Task ID is required');
        }
    }
}

module.exports = PomodoroSession;