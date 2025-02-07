// controllers/task.controller.js
const TaskModel = require('../models/task.mongoose');
const MongoDBService = require('../db/mongodb');

const dbService = new MongoDBService(TaskModel);

class TaskController {
    async getAllTasks(req, res) {
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
        try {
            const tasks = await dbService.find();
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getTaskById(req, res) {
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
        try {
            const task = await dbService.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Cannot find task' });
            }
            res.json(task);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createTask(req, res) {
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
        try {
            const task = await dbService.create(req.body);
            res.status(201).json(task);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateTask(req, res) {
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
           #swagger.responses[200] = {
               description: 'Task updated successfully',
               schema: { $ref: '#/definitions/TaskResponse' }
           }
           #swagger.responses[404] = {
               description: 'Task not found',
               schema: { message: 'Cannot find task' }
           }
        */
        try {
            const task = await dbService.update(req.params.id, req.body);
            if (!task) {
                return res.status(404).json({ message: 'Cannot find task' });
            }
            res.json(task);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteTask(req, res) {
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
        try {
            const task = await dbService.delete(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Cannot find task' });
            }
            res.json({ message: 'Task deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new TaskController();