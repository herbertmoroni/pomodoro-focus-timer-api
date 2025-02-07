class Task {
    constructor(data = {}) {
        this.taskName = data.taskName;
        this.description = data.description;
        this.totalTimeSpent = data.totalTimeSpent || 0;
        this.category = data.category;
        this.isActive = data.isActive ?? true;
        this.defaultDuration = data.defaultDuration || 1500;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    validate() {
        if (!this.taskName) {
            throw new Error('Task name is required');
        }
    }
}

module.exports = Task;