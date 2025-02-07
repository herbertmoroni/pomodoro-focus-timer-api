const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
      title: 'Task API',
      description: 'Task API Documentation'
  },
  host: 'pomodoro-focus-timer-api.onrender.com',
  schemes: ['https'],
  //host: 'localhost:3000',
  //schemes: ['http'],
  definitions: {
      TaskInput: {
          taskName: "Discounts",
          description: "Time spent on Discounts and Promotions",
          category: "Work",
          defaultDuration: 1500
      },
      TaskResponse: {
          taskId: "67a575c2f7493400c45072a3",
          taskName: "Discounts",
          description: "Time spent on Discounts and Promotions",
          totalTimeSpent: 0,
          category: "Work",
          isActive: true,
          defaultDuration: 1500,
          createdAt: "2025-02-07T02:53:54.124Z",
          updatedAt: "2025-02-07T02:53:54.124Z"
      }
  }
};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);