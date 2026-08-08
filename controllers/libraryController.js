const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, school: req.user.schoolId });
    await book.save();
    res.status(201).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ school: req.user.schoolId }).sort({ title: 1 });
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
