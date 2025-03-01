// docs/swagger.js - Updated
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
      url: process.env.NODE_ENV === 'development' ? 'http://localhost:'+ process.env.PORT : 'https://pomodoro-focus-timer-api.onrender.com',
    }
  ],
  security: [
    {
      bearerAuth: []
    }
  ],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        security: [], // No authentication required for signup
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SignupInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          400: { description: 'Validation error' },
          500: { description: 'Server error' }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login with existing credentials',
        security: [], // No authentication required for login
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          401: { description: 'Invalid credentials' },
          500: { description: 'Server error' }
        }
      }
    },
    '/auth/me': {
      get: {
        tags: ['Authentication'],
        summary: 'Get current user profile',
        responses: {
          200: {
            description: 'User profile retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserProfile' }
              }
            }
          },
          401: { description: 'Unauthorized - Invalid or expired token' },
          404: { description: 'User not found' },
          500: { description: 'Server error' }
        }
      }
    },
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
    },
    '/sessions': {
      get: {
        tags: ['Sessions'],
        summary: 'Get all sessions',
        responses: {
          200: {
            description: 'List of sessions retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Session' }
                }
              }
            }
          },
          404: { description: 'No sessions found' },
          500: { description: 'Server error' }
        }
      },
      post: {
        tags: ['Sessions'],
        summary: 'Create new session',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SessionInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Session created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Session' }
              }
            }
          },
          400: { description: 'Validation error' },
          404: { description: 'Task not found' },
          500: { description: 'Server error' }
        }
      }
    },
    '/sessions/{id}': {
      get: {
        tags: ['Sessions'],
        summary: 'Get session by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Session ID'
          }
        ],
        responses: {
          200: {
            description: 'Session found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Session' }
              }
            }
          },
          404: { description: 'Session not found' }
        }
      },
      put: {
        tags: ['Sessions'],
        summary: 'Update session',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Session ID'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SessionInput' }
            }
          }
        },
        responses: {
          204: {
            description: 'Session updated successfully'
          },
          400: { description: 'Validation error' },
          404: { description: 'Session not found' }
        }
      },
      delete: {
        tags: ['Sessions'],
        summary: 'Delete session',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Session ID'
          }
        ],
        responses: {
          200: {
            description: 'Session deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Session deleted' }
                  }
                }
              }
            }
          },
          404: { description: 'Session not found' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      SignupInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', format: 'password', example: 'password123' },
          displayName: { type: 'string', example: 'John Doe' }
        }
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', format: 'password', example: 'password123' }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'success' },
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/UserProfile' }
            }
          }
        }
      },
      UserProfile: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '67a575c2f7493400c45072a3' },
          email: { type: 'string', example: 'user@example.com' },
          displayName: { type: 'string', example: 'John Doe' },
          settings: {
            type: 'object',
            properties: {
              defaultPomodoroLength: { type: 'number', example: 1500 },
              defaultBreakLength: { type: 'number', example: 300 }
            }
          }
        }
      },
      Task: {
        type: 'object',
        required: ['taskName'],
        properties: {
          _id: { type: 'string', example: '67a575c2f7493400c45072a3' },
          taskName: { type: 'string', example: 'Discounts' },
          description: { type: 'string', example: 'Time spent on Discounts and Promotions' },
          totalTimeSpent: { type: 'number', example: 0, default: 0 },
          category: { type: 'string', example: 'Work' },
          isActive: { type: 'boolean', example: true, default: true },
          defaultDuration: { type: 'number', example: 1500, default: 1500 },
          userId: { type: 'string', example: '67a575c2f7493400c45072a1' },
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
      Session: {
        type: 'object',
        required: ['taskId'],
        properties: {
          _id: { type: 'string', example: '67a575c2f7493400c45072a4' },
          taskId: { type: 'string', example: '67a575c2f7493400c45072a3' },
          userId: { type: 'string', example: '67a575c2f7493400c45072a1' },
          startTime: { type: 'string', format: 'date-time', example: '2025-02-07T03:00:00.000Z' },
          duration: { type: 'number', example: 1500, default: 1500 },
          completed: { type: 'boolean', example: false, default: false },
          notes: { type: 'string', example: 'Focused work session with minimal distractions' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-02-07T03:00:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2025-02-07T03:25:00.000Z' }
        }
      },
      SessionInput: {
        type: 'object',
        required: ['taskId'],
        properties: {
          taskId: { type: 'string', example: '67a575c2f7493400c45072a3' },
          duration: { type: 'number', example: 1500, default: 1500 },
          completed: { type: 'boolean', example: false, default: false },
          notes: { type: 'string', example: 'Focused work session with minimal distractions' }
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