const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');

router.use('/tasks', require('./tasks'));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;