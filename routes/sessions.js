const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionsController');
const { validateSession, handleValidationErrors } = require('../middleware/sessionValidation');

router.get('/', sessionController.getAllSessions);
router.get('/:id', validateSession.getById, handleValidationErrors, sessionController.getSessionById);
router.post('/', validateSession.create, handleValidationErrors, sessionController.createSession);
router.put('/:id', validateSession.update, handleValidationErrors, sessionController.updateSession);
router.delete('/:id', validateSession.delete, handleValidationErrors, sessionController.deleteSession);

module.exports = router;