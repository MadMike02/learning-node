const express = require('express');

const app = express();

app.get('/', (req, res) => {
  //send string
  //   res.status(200).send('Hello from the server side');
  res.status(200).json({ message: 'Hello from the server side' });
});

app.post('/', (req, res) => {
  res.status(200).send('this is post request');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
