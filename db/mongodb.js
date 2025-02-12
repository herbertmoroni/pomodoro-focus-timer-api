const TaskModel = require('../models/task.mongoose');
const Task = require('../models/task.interface');

class MongoDBService {
    async create(taskData) {
        try {
            const taskInterface = new Task(taskData);
            taskInterface.validate();

            const task = TaskModel.fromTaskInterface(taskInterface);
            const savedTask = await task.save();
            
            return savedTask.toTaskInterface();
        } catch (error) {
            throw new Error(`Error creating task: ${error.message}`);
        }
    }

    async find() {
        try {
            const tasks = await TaskModel.find();
            return tasks.map(task => task.toTaskInterface());
        } catch (error) {
            throw new Error(`Error finding tasks: ${error.message}`);
        }
    }

    async update(id, taskData) {
        try {
            const task = await TaskModel.findById(id);
            if (!task) return null;
            
            Object.assign(task, taskData);
            const updatedTask = await task.save();
            return updatedTask.toTaskInterface();
        } catch (error) {
            throw new Error(`Error updating task: ${error.message}`);
        }
    }
    
    async delete(id) {
        try {
            const task = await TaskModel.findByIdAndDelete(id);
            return task ? task.toTaskInterface() : null;
        } catch (error) {
            throw new Error(`Error deleting task: ${error.message}`);
        }
    }
    
    async findById(id) {
        try {
            const task = await TaskModel.findById(id);
            return task ? task.toTaskInterface() : null;
        } catch (error) {
            throw new Error(`Error finding task: ${error.message}`);
        }
    }
}

module.exports = MongoDBService;