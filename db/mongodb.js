const TaskModel = require('../models/task.mongoose');
const Task = require('../models/task.interface');

class MongoDBService {
    async create(taskData) {
        try {
            // Create interface instance to validate
            const taskInterface = new Task(taskData);
            taskInterface.validate();

            // Create mongoose model from interface
            const task = TaskModel.fromTaskInterface(taskInterface);
            const savedTask = await task.save();
            
            // Return as interface type
            return savedTask.toTaskInterface();
        } catch (error) {
            throw new Error(`Error creating task: ${error.message}`);
        }
    }

    async find() {
        try {
            const tasks = await TaskModel.find();
            // Convert all tasks to interface type
            return tasks.map(task => task.toTaskInterface());
        } catch (error) {
            throw new Error(`Error finding tasks: ${error.message}`);
        }
    }
}

module.exports = MongoDBService;