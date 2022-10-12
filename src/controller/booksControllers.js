const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Book = require('../models/book');

exports.getBook = (req, res, next) => {
  const currentBook = req.query.page || 1;
  const perBook = 2;
  let totalItems;
  Book.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Book.find()
        .skip((currentBook - 1) * perBook)
        .limit(per);
    })
    .then(books => {
      res.status(200).json({
        message: 'Fetched book successfully.',
        books: books,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const author = req.body.author;
  let creator;
  const book = new Book({
    title: title,
    price:price,
    description: description,
    author: author,
    creator: req.userId
  });
  book
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.books.push(book);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Book created successfully!',
        book: book,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getBook = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then(book => {
      if (!book) {
        const error = new Error('Could not find book.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Book fetched.', book: book });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateBook = (req, res, next) => {
  const bookId = req.params.bookId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  Book.findById(bookId)
    .then(book => {
      if (!book) {
        const error = new Error('Could not find book.');
        error.statusCode = 404;
        throw error;
      }
      if (book.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      book.title = title;
      book.price = price,
      book.description = description,
      book.author=author

      return book.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Book updated!', book: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteBook = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then(book => {
      if (!book) {
        const error = new Error('Could not find Book.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      // Check logged in user
      return Book.findByIdAndRemove(bookId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.books.pull(bookId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted post.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};