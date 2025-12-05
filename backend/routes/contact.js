const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { 
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 5, max: 100 }).withMessage('Subject must be 5-100 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters')
];

const statusValidation = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['unread', 'read', 'replied', 'archived']).withMessage('Invalid status')
];

// Public routes
router.post('/', contactValidation, validate, submitContact);

// Admin routes
router.get('/', protect, admin, getContacts);
router.get('/:id', protect, admin, getContact);
router.put('/:id', protect, admin, statusValidation, validate, updateContactStatus);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router;
