const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const updateUserValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email'),
  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Role must be user or admin')
];

// All routes require auth and admin
router.use(protect, admin);

// Routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUserValidation, validate, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
