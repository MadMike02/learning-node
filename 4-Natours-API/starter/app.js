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

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

//:id -- required param, :id? -- optinonal param
app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
