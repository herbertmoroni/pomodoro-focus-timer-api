const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pomodoro Focus Timer API',
    description: 'API for managing tasks and tracking time spent on tasks',
  },
  //host: 'name-api-whdx.onrender.com',
  //schemes: ['https'],
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);