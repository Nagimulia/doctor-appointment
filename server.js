const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Server running!' });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`);
});
