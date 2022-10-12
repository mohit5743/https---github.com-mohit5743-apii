const express = require('express');
const { body } = require('express-validator/check');

const bookController = require('../controller/booksControllers');
const isAuth = require('../middleware/is-author');

const router = express.Router();

// GET /feed/books
router.get('/book', isAuth, bookController.getBook);

// POST /feed/books
router.post(
  '/book',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('price')
      .trim()
      .isLength({min:5}),
    body('author')
      .trim()
      .isLength({min: 5}),
    body('description')
      .trim()
      .isLength({ min: 200 })
  ],
  bookController.createBook
);

router.get('/book/:bookId', isAuth, bookController.getBook);

router.put('/book/:bookId',
    isAuth,
    [
      body('title')
        .trim()
        .isLength({ min: 5 }),
      body('price')
        .trim()
        .isLength({min:5}),
      body('author')
        .trim()
        .isLength({min: 5}),
      body('description')
        .trim()
        .isLength({ min: 200 })
    ],
    bookController.updateBook
);

router.delete('/book/:bookId', isAuth, bookController.deleteBook);

module.exports = router;