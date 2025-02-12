const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validateTask = {
    create: [
        body('taskName')
            .trim()
            .notEmpty()
            .withMessage('Task name is required')
            .isLength({ min: 1, max: 100 })
            .withMessage('Task name must be between 1 and 100 characters'),
        
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Description cannot exceed 500 characters'),
        
        body('category')
            .optional()
            .trim()
            .isLength({ max: 50 })
            .withMessage('Category cannot exceed 50 characters'),
        
        body('defaultDuration')
            .optional()
            .isInt({ min: 60, max: 7200 })
            .withMessage('Default duration must be between 60 and 7200 seconds'),
        
        body('isActive')
            .optional()
            .isBoolean()
            .withMessage('isActive must be a boolean value'),
    ],

    update: [
        param('id')
            .isMongoId()
            .withMessage('Invalid task ID format'),
        
        body('taskName')
            .optional()
            .trim()
            .isLength({ min: 1, max: 100 })
            .withMessage('Task name must be between 1 and 100 characters'),
        
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Description cannot exceed 500 characters'),
        
        body('category')
            .optional()
            .trim()
            .isLength({ max: 50 })
            .withMessage('Category cannot exceed 50 characters'),
        
        body('defaultDuration')
            .optional()
            .isInt({ min: 60, max: 7200 })
            .withMessage('Default duration must be between 60 and 7200 seconds'),
        
        body('isActive')
            .optional()
            .isBoolean()
            .withMessage('isActive must be a boolean value'),
    ],

    delete: [
        param('id')
            .isMongoId()
            .withMessage('Invalid task ID format'),
    ],

    getById: [
        param('id')
            .isMongoId()
            .withMessage('Invalid task ID format'),
    ]
};

// Validation result handler middleware
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
    validateTask,
    handleValidationErrors
};