const TaskModel = require('../models/task.mongoose');
const MongoDBService = require('../db/mongodb');

const dbService = new MongoDBService(TaskModel);

class TaskController {
    async getAllTasks(req, res) {
        try {
            const tasks = await dbService.find();
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createTask(req, res) {
     /*  #swagger.parameters['newContact'] = {
            in: 'body',
            description: 'Contact information.',
            required: true,
            schema: {
                taskName: "Discuss project",
                description: "Developer",
                totalTimeSpent: 123,
                category: "Developer",
                isActive: true,
                defaultDuration: 1500,
                createdAt: "2021-10-01T00:00:00.000Z",
                updatedAt: "2021-10-01T00:00:00.000Z"
                }
    } */
        try {
            const task = await dbService.create(req.body);
            res.status(201).json(task);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new TaskController();