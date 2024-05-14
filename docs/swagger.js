// const swaggerJsdoc = require('swagger-jsdoc');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'crowdfunding',
//       version: '1.0.0',
//       description: 'complete rest api for crowdfunding platforms',
//     },
//   },
//   apis: ['./routes/v1/*.js'], // Path to the API docs
// };

// const specs = swaggerJsdoc(options);
// module.exports = specs;

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'crowdfunding',
      version: '1.0.0',
      description: 'complete rest api for crowdfunding platforms',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/v1/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
module.exports = specs;
