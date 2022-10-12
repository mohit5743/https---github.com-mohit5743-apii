const express = require('express');
const { body } = require('express-validator/check');

const bookController = require('../controllers/booksControllers');
const isAuth = require('../middleware/is-author');

const router = express.Router();

// GET /feed/books
router.get('/books', isAuth, bookController.getBook);

// POST /feed/books
router.post(
  '/post',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 200 })
  ],
  bookController.createBook
);

router.get('/book/:bookId', isAuth, bookController.getBook);

router.put(
  '/book/:bookId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 200 })
  ],
  feedController.updatePost
);

router.delete('/post/:postId', isAuth, bookController.deleteBook);

module.exports = router;