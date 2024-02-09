const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// dotenv.config();

const db_url = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('db connected');
  });

//schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

//model
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The park Camper',
  price: 997,
});
testTour
  .save()
  .then((doc) => {
    console.log('created', doc);
  })
  .catch((err) => {
    console.log('error', err);
  });
const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
