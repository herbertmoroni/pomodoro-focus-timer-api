const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Pomodoro Focus Timer API',
    version: '1.0.0',
    description: 'A RESTful API for managing Pomodoro tasks and sessions, helping users track their time and productivity efficiently.'
  },
  servers: [
    {
        url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://pomodoro-focus-timer-api.onrender.com',
    }
  ],
  paths: {
    '/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Get all tasks',
        responses: {
          200: {
            description: 'List of tasks retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Task' }
                }
              }
            }
          },
          404: { description: 'No tasks found' },
          500: { description: 'Server error' }
        }
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create new task',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TaskInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Task created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' }
              }
            }
          },
          400: { description: 'Validation error' },
          500: { description: 'Server error' }
        }
      }
    },
    '/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get task by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Task ID'
          }
        ],
        responses: {
          200: {
            description: 'Task found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' }
              }
            }
          },
          404: { description: 'Task not found' }
        }
      },
      put: {
        tags: ['Tasks'],
        summary: 'Update task',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Task ID'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TaskInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Task updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' }
              }
            }
          },
          400: { description: 'Validation error' },
          404: { description: 'Task not found' }
        }
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete task',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Task ID'
          }
        ],
        responses: {
          200: {
            description: 'Task deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Task deleted' }
                  }
                }
              }
            }
          },
          404: { description: 'Task not found' }
        }
      }
    }
  },
  components: {
    schemas: {
      Task: {
        type: 'object',
        required: ['taskName'],
        properties: {
          taskId: { type: 'string', example: '67a575c2f7493400c45072a3' },
          taskName: { type: 'string', example: 'Discounts' },
          description: { type: 'string', example: 'Time spent on Discounts and Promotions' },
          totalTimeSpent: { type: 'number', example: 0, default: 0 },
          category: { type: 'string', example: 'Work' },
          isActive: { type: 'boolean', example: true, default: true },
          defaultDuration: { type: 'number', example: 1500, default: 1500 },
          createdAt: { type: 'string', format: 'date-time', example: '2025-02-07T02:53:54.124Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2025-02-07T02:53:54.124Z' }
        }
      },
      TaskInput: {
        type: 'object',
        required: ['taskName'],
        properties: {
          taskName: { type: 'string', example: 'Discounts' },
          description: { type: 'string', example: 'Time spent on Discounts and Promotions' },
          category: { type: 'string', example: 'Work' },
          defaultDuration: { type: 'number', example: 1500, default: 1500 }
        }
      },
      ValidationError: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'defaultDuration' },
                message: { type: 'string', example: 'Default duration must be between 60 and 7200 seconds' }
              }
            }
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: [] // No file scanning needed
};

module.exports = swaggerJsdoc(options);