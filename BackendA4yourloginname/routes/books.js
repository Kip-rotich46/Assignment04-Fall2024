const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db'); // Import the function to connect to DB

const Book = require('../models/book');  // Correctly import the Book model

// POST: Add a new book
router.post('/add', async (req, res) => {
  const { serialNo, bookTitle, authorName } = req.body;
  try {
    const db = await connectToDatabase();
    const booksCollection = db.collection('books');

    // Check if the book already exists
    const existingBook = await booksCollection.findOne({ serialNo });
    if (existingBook) {
      return res.status(400).json({ message: 'Book exists, please check the serial number' });
    }

    // Insert new book
    const newBook = { serialNo, bookTitle, authorName };
    await booksCollection.insertOne(newBook);
    res.status(201).json({ message: 'Book added to the library', book: newBook });
  } catch (error) {
    console.error("Error in POST /add:", error); // Log the error details
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
});

// GET: Check if book exists by serialNo
router.get('/check', async (req, res) => {
  try {
    const { serialNo } = req.query;  // Get serialNo from the query params
    if (!serialNo) {
      return res.status(400).json({ message: "Serial number is required" });
    }

    const book = await Book.findOne({ serialNo });  // Find book by serialNo
    if (book) {
      return res.status(200).json({
        message: "Book available to rent",
        book: book,
      });
    } else {
      return res.status(404).json({
        message: "Book not found"
      });
    }
  } catch (err) {
    console.error(err);  // Log the error for debugging
    return res.status(500).json({
      message: "Error fetching book",
      error: err.message  // Send the specific error message
    });
  }
});

// PUT: Update a book
router.put('/update', async (req, res) => {
  const { serialNo, bookTitle, authorName } = req.body;
  try {
    const db = await connectToDatabase();
    const booksCollection = db.collection('books');

    const updatedBook = { serialNo, bookTitle, authorName };
    const result = await booksCollection.updateOne(
      { serialNo },
      { $set: updatedBook },
      { upsert: true }
    );

    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      res.status(200).json({ message: 'Book information updated', book: updatedBook });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error("Error in PUT /update:", error); // Log the error details
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
});

// DELETE: Remove a book by serialNo
router.delete('/remove', async (req, res) => {
  try {
    const { serialNo } = req.query;  // Get serialNo from query parameters
    if (!serialNo) {
      return res.status(400).json({ message: "Serial number is required" });
    }

    const book = await Book.findOneAndDelete({ serialNo });  // Find and delete the book by serialNo
    if (book) {
      return res.status(200).json({
        message: "Book removed from the library",
        book: book,  // Ensure the deleted book is sent back
      });
    } else {
      return res.status(404).json({
        message: "Book not found"
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error removing book",
      error: err.message
    });
  }
});


module.exports = router;
