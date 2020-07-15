const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
// const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

// //--CONNECT TO MongoDB------------------------------------
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('___connected to MongoDB____');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });
// //---------------------------------------------------------

logger.info('___connecting to___', config.MONGODB_URI);

// //--Middleware in Use--------------------------------------
app.use(cors());

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.getTokenFrom);

app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
// //---------------------------------------------------------

module.exports = app;
