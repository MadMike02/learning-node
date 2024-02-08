const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//3rd party middleware
app.use(morgan('dev'));

//middleware for adding request data in request body
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware !');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
// app.get('/', (req, res) => {
//   //send string
//   //   res.status(200).send('Hello from the server side');
//   res.status(200).json({ message: 'Hello from the server side' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('this is post request');
// });

// app.get('/api/v1/tours', getAllTours);
// //:id -- required param, :id? -- optinonal param
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', generalRequest);
// app.delete('/api/v1/tours/:id', generalRequest);
