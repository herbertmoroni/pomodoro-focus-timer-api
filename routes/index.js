const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');

router.use('/tasks', protect, require('./tasks'));
router.use('/sessions', protect, require('./sessions'));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;