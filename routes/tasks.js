const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');
const { validateTask, handleValidationErrors } = require('../middleware/taskValidation');

router.get('/', taskController.getAllTasks);
router.get('/:id', validateTask.getById, handleValidationErrors, taskController.getTaskById);
router.post('/', validateTask.create, handleValidationErrors, taskController.createTask);
router.put('/:id', validateTask.update, handleValidationErrors, taskController.updateTask);
router.delete('/:id', validateTask.delete, handleValidationErrors, taskController.deleteTask);

module.exports = router;