const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const movies = require('./routes/movies')
const auth = require('./routes/auth')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: '*'
}));
app.use(express.json());
const uri = process.env.ATLAS_URI;mongoose.connect(uri);
const connection = mongoose.connection;connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use('/movies', movies);
app.use('/auth', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build', 'index.html'))
  })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});