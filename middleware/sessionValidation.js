const { body, param, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const validateSession = {
    create: [
        body('taskId')
            .notEmpty()
            .withMessage('Task ID is required')
            .custom(value => mongoose.Types.ObjectId.isValid(value))
            .withMessage('Invalid Task ID format'),
        
        body('duration')
            .optional()
            .isInt({ min: 60, max: 7200 })
            .withMessage('Duration must be between 60 and 7200 seconds'),
        
        body('completed')
            .optional()
            .isBoolean()
            .withMessage('Completed must be a boolean value'),
        
        body('notes')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Notes cannot exceed 500 characters'),
    ],

    update: [
        param('id')
            .isMongoId()
            .withMessage('Invalid session ID format'),
        
        body('completed')
            .optional()
            .isBoolean()
            .withMessage('Completed must be a boolean value'),
        
        body('notes')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Notes cannot exceed 500 characters'),
    ],

    delete: [
        param('id')
            .isMongoId()
            .withMessage('Invalid session ID format'),
    ],

    getById: [
        param('id')
            .isMongoId()
            .withMessage('Invalid session ID format'),
    ]
};

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

module.exports = {
    validateSession,
    handleValidationErrors
};