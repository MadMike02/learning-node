const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../models/tourModel');
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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}

console.log('process', process.argv);
