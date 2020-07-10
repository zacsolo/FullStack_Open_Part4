const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

/*APP.js is now fully responsible for establishing 
the connection to the database*/

//--Displays the route that we're connected to
logger.info('connecting to', config.MONGO_URI);

//--Connects us to the Database using Mongoose
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

//--Makes use of all the middleware in our application
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

/*-- This is what defines the base URL used by our router
in controllers */
app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
