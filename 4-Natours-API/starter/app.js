const express = require('express');
const fs = require('fs');

const app = express();

//middleware for adding request data in request body
app.use(express.json());
// app.get('/', (req, res) => {
//   //send string
//   //   res.status(200).send('Hello from the server side');
//   res.status(200).json({ message: 'Hello from the server side' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('this is post request');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const generalRequest = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// app.get('/api/v1/tours', getAllTours);
// //:id -- required param, :id? -- optinonal param
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', generalRequest);
// app.delete('/api/v1/tours/:id', generalRequest);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(generalRequest)
  .delete(generalRequest);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
