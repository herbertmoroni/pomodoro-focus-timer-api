const TaskModel = require('../models/task.mongoose');
const MongoDBService = require('../db/mongodb');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const dbService = new MongoDBService(TaskModel);

class TaskController {
    
    getAllTasks = catchAsync(async (req, res) => {
        /* #swagger.tags = ['Tasks']
           #swagger.description = 'Get all tasks'
           #swagger.responses[200] = {
               description: 'Tasks successfully obtained',
               schema: [{ $ref: '#/definitions/TaskResponse' }]
           }
           #swagger.responses[500] = {
               description: 'Server error',
               schema: { message: 'Error message' }
           }
        */
        const tasks = await dbService.find();
        if (!tasks.length) {
            throw new AppError('No tasks found', 404);
        }
        res.json(tasks);
    });

    getTaskById = catchAsync(async (req, res) => {
         /* #swagger.tags = ['Tasks']
           #swagger.description = 'Get task by ID'
           #swagger.parameters['id'] = {
               in: 'path',
               description: 'Task ID',
               required: true,
               type: 'string'
           }
           #swagger.responses[200] = {
               description: 'Task found',
               schema: { $ref: '#/definitions/TaskResponse' }
           }
           #swagger.responses[404] = {
               description: 'Task not found',
               schema: { message: 'Cannot find task' }
           }
        */
        const task = await dbService.findById(req.params.id);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.json(task);
    });

    createTask = catchAsync(async (req, res) => {
        /* #swagger.tags = ['Tasks']
           #swagger.description = 'Create a new task'
           #swagger.parameters['obj'] = {
               in: 'body',
               description: 'Task information',
               required: true,
               schema: { $ref: '#/definitions/TaskInput' }
           }
           #swagger.responses[201] = {
               description: 'Task created successfully',
               schema: { $ref: '#/definitions/TaskResponse' }
           }
           #swagger.responses[400] = {
               description: 'Invalid input',
               schema: { message: 'Error message' }
           }
        */
        const task = await dbService.create(req.body);
        res.status(201).json(task);
    });

    updateTask = catchAsync(async (req, res) => {
        /* #swagger.tags = ['Tasks']
           #swagger.description = 'Update a task'
           #swagger.parameters['id'] = {
               in: 'path',
               description: 'Task ID',
               required: true,
               type: 'string'
           }
           #swagger.parameters['obj'] = {
               in: 'body',
               description: 'Updated task information',
               required: true,
               schema: { $ref: '#/definitions/TaskInput' }
           }
           #swagger.responses[204] = {
               description: 'Task updated successfully',
               schema: { $ref: '#/definitions/TaskResponse' }
           }
           #swagger.responses[404] = {
               description: 'Task not found',
               schema: { message: 'Cannot find task' }
           }
        */
        const task = await dbService.update(req.params.id, req.body);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.status(204).end();
    });

    deleteTask = catchAsync(async (req, res) => {
        /* #swagger.tags = ['Tasks']
           #swagger.description = 'Delete a task'
           #swagger.parameters['id'] = {
               in: 'path',
               description: 'Task ID',
               required: true,
               type: 'string'
           }
           #swagger.responses[200] = {
               description: 'Task deleted successfully',
               schema: { message: 'Task deleted' }
           }
           #swagger.responses[404] = {
               description: 'Task not found',
               schema: { message: 'Cannot find task' }
           }
        */
        const task = await dbService.delete(req.params.id);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.status(200).json({ message: 'Task deleted' });
    });
}

module.exports = new TaskController();