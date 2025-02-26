const PomodoroSessionModel = require('../models/pomodoro-session.mongoose');
const TaskModel = require('../models/task.mongoose');
const MongoDBService = require('../db/mongodb.service');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const dbService = new MongoDBService(PomodoroSessionModel);

class SessionController {
    
    getAllSessions = catchAsync(async (req, res) => {
        const sessions = await dbService.find();
        if (!sessions.length) {
            throw new AppError('No sessions found', 404);
        }
        res.json(sessions);
    });

    getSessionById = catchAsync(async (req, res) => {
        const session = await dbService.findById(req.params.id);
        if (!session) {
            throw new AppError('Session not found', 404);
        }
        res.json(session);
    });

    createSession = catchAsync(async (req, res) => {
        // Verify the task exists
        const task = await TaskModel.findById(req.body.taskId);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        
        const sessionData = {
            ...req.body,
            userId: req.userId // Assuming req.userId contains the authenticated user's ID
        };
        
        const session = await dbService.create(sessionData);
        res.status(201).json(session);
    });

    updateSession = catchAsync(async (req, res) => {
        const session = await dbService.update(req.params.id, req.body);
        if (!session) {
            throw new AppError('Session not found', 404);
        }
        
        // If session is completed, update task's totalTimeSpent
        if (req.body.completed === true && session.completed === true) {
            const task = await TaskModel.findById(session.taskId);
            if (task) {
                task.totalTimeSpent += session.duration;
                await task.save();
            }
        }
        
        res.status(204).end();
    });

    deleteSession = catchAsync(async (req, res) => {
        const session = await dbService.delete(req.params.id);
        if (!session) {
            throw new AppError('Session not found', 404);
        }
        res.status(200).json({ message: 'Session deleted' });
    });
}

module.exports = new SessionController();