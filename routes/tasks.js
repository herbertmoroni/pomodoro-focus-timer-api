const express = require('express');
const router = express.Router();
const TaskModel = require('../models/task.mongoose');
const MongoDBService = require('../db/mongodb');

const dbService = new MongoDBService(TaskModel);

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await dbService.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new task
router.post('/', async (req, res) => {
    try {
        const task = await dbService.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;