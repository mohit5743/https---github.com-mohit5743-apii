const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controller/author');
const isAuth = require('../middleware/is-author');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        const userDoc =  User.findOne({ email: value });
          if (userDoc) {
              return Promise.reject('E-Mail address already exists!');
          }
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.updateUserStatus
);

module.exports = router;