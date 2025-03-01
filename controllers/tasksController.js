const TaskModel = require('../models/task.mongoose');
const MongoDBService = require('../db/mongodb.service');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const dbService = new MongoDBService(TaskModel);

class TaskController {
    
    getAllTasks = catchAsync(async (req, res) => {
        // Using Firebase UID directly from the auth middleware
        const tasks = await dbService.find({ userId: req.userId });
        if (!tasks.length) {
            return res.json([]);  // Return empty array instead of 404 error
        }
        res.json(tasks);
    });

    getTaskById = catchAsync(async (req, res) => {
        const task = await dbService.findById(req.params.id);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        
        // Check if the task belongs to the current user
        if (task.userId !== req.userId) {
            throw new AppError('You do not have permission to access this task', 403);
        }
        
        res.json(task);
    });

    createTask = catchAsync(async (req, res) => {
        const taskData = {
            ...req.body,
            userId: req.userId  // Using Firebase UID directly from the auth middleware
        };
        
        const task = await dbService.create(taskData);
        res.status(201).json(task);
    });

    updateTask = catchAsync(async (req, res) => {
        // First, check if the task exists and belongs to the user
        const existingTask = await dbService.findById(req.params.id);
        if (!existingTask) {
            throw new AppError('Task not found', 404);
        }
        
        if (existingTask.userId !== req.userId) {
            throw new AppError('You do not have permission to update this task', 403);
        }
          
        const task = await dbService.update(req.params.id, req.body);
        res.status(200).json(task);
    });

    deleteTask = catchAsync(async (req, res) => {
        // First, check if the task exists and belongs to the user
        const existingTask = await dbService.findById(req.params.id);
        if (!existingTask) {
            throw new AppError('Task not found', 404);
        }
        
        if (existingTask.userId !== req.userId) {
            throw new AppError('You do not have permission to delete this task', 403);
        }
         
        const task = await dbService.delete(req.params.id);
        res.status(200).json({ message: 'Task deleted' });
    });
}

module.exports = new TaskController();