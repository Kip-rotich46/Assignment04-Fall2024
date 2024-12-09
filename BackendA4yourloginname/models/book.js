const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
  serialNo: { type: Number, required: true, unique: true },
  bookTitle: { type: String, required: true },
  authorName: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
