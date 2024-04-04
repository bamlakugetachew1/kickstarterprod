const express = require('express');
const { xss } = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const ErrorHandler = require('./middlewares/ErrorHandler');
const morgan = require('./config/morgan');

const app = express();
app.use(xss());
app.use(helmet());
app.use(
  mongoSanitize({
    allowDots: true,
    replaceWith: '_',
  }),
);
app.use(express.json());
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(cors());
// handle 404 error
app.use((req, res) => {
  res.status(404).send('The resource is not availlable in this page');
});

app.use(ErrorHandler);
module.exports = app;
