const TaskModel = require('../models/task.mongoose');
const MongoDBService = require('../db/mongodb');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const dbService = new MongoDBService(TaskModel);

class TaskController {
    
    getAllTasks = catchAsync(async (req, res) => {
        const tasks = await dbService.find();
        if (!tasks.length) {
            throw new AppError('No tasks found', 404);
        }
        res.json(tasks);
    });

    getTaskById = catchAsync(async (req, res) => {
        const task = await dbService.findById(req.params.id);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.json(task);
    });

    createTask = catchAsync(async (req, res) => {
        const task = await dbService.create(req.body);
        res.status(201).json(task);
    });

    updateTask = catchAsync(async (req, res) => {
          const task = await dbService.update(req.params.id, req.body);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.status(204).end();
    });

    deleteTask = catchAsync(async (req, res) => {
         const task = await dbService.delete(req.params.id);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.status(200).json({ message: 'Task deleted' });
    });
}

module.exports = new TaskController();