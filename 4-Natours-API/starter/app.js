const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/AppErros');
const globalErrorHandler = require('./controllers/ErrorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//3rd party middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//middleware for adding request data in request body
app.use(express.json());

//static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//If route has not processed by any one above route then it will come here
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl}`,
  // });

  //if argument is passed in next then it will skip others middleware and goes staright to global error handler
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

//global error handle middleware
app.use(globalErrorHandler);

module.exports = app;
