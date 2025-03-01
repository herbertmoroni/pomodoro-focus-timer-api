const PomodoroSessionModel = require('../models/pomodoro-session.mongoose');
const TaskModel = require('../models/task.mongoose');
const MongoDBService = require('../db/mongodb.service');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const dbService = new MongoDBService(PomodoroSessionModel);

class SessionController {
    
    getAllSessions = catchAsync(async (req, res) => {
        // Using Firebase UID directly from the auth middleware
        const sessions = await dbService.find({ userId: req.userId });
        if (!sessions.length) {
            return res.json([]);  // Return empty array instead of 404 error
        }
        res.json(sessions);
    });

    getSessionById = catchAsync(async (req, res) => {
        const session = await dbService.findById(req.params.id);
        if (!session) {
            throw new AppError('Session not found', 404);
        }
        
        // Check if the session belongs to the current user - direct string comparison
        if (session.userId !== req.userId) {
            throw new AppError('You do not have permission to access this session', 403);
        }
        
        res.json(session);
    });

    createSession = catchAsync(async (req, res) => {
        // Verify the task exists
        const task = await TaskModel.findById(req.body.taskId);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        
        // Verify the task belongs to the current user - direct string comparison
        if (task.userId !== req.userId) {
            throw new AppError('You do not have permission to create a session for this task', 403);
        }
        
        const sessionData = {
            ...req.body,
            userId: req.userId  // Using Firebase UID directly from the auth middleware
        };
        
        const session = await dbService.create(sessionData);
        res.status(201).json(session);
    });

    updateSession = catchAsync(async (req, res) => {
        // First, check if the session exists and belongs to the user
        const existingSession = await dbService.findById(req.params.id);
        if (!existingSession) {
            throw new AppError('Session not found', 404);
        }
        
        if (existingSession.userId !== req.userId) {
            throw new AppError('You do not have permission to update this session', 403);
        }
        
        const session = await dbService.update(req.params.id, req.body);
        
        // If session is completed, update task's totalTimeSpent
        if (req.body.completed === true && !existingSession.completed) {
            const task = await TaskModel.findById(existingSession.taskId);
            if (task) {
                task.totalTimeSpent += existingSession.duration;
                await task.save();
            }
        }
        
        res.status(200).json(session);
    });

    deleteSession = catchAsync(async (req, res) => {
        // First, check if the session exists and belongs to the user
        const existingSession = await dbService.findById(req.params.id);
        if (!existingSession) {
            throw new AppError('Session not found', 404);
        }
        
        if (existingSession.userId !== req.userId) {
            throw new AppError('You do not have permission to delete this session', 403);
        }
         
        const session = await dbService.delete(req.params.id);
        res.status(200).json({ message: 'Session deleted' });
    });
}

module.exports = new SessionController();