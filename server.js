const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Initializing Express to the application
const app = express();

// Database configuration
const database = require('./config/keys').mongodbURI;

// Connect to MongoDB through Mongoose
mongoose
  .connect(database)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes Configuration
app.use('/api/users', users);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
