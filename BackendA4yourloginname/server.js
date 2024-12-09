const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB connection string
const mongoURI = "mongodb+srv://protio:protio@cluster0.dro4v.mongodb.net/assignment4?retryWrites=true&w=majority";

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes
const booksRouter = require('./routes/books');
app.use('/', booksRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
