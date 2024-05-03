const express = require('express');
const { xss } = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const ErrorHandler = require('./middlewares/error.handler');
const morgan = require('./config/morgan');
const v1routes = require('./routes/v1');

const app = express();
app.use(xss());
app.use(hpp());
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
app.use('/api/v1', v1routes);

// handle 404 error
app.use((req, res) => {
  res.status(404).send('The resource is not availlable in this page');
});

app.use(ErrorHandler);
module.exports = app;
