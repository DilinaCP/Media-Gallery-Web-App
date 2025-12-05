const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { 
  uploadMedia,
  getPublicMedia,
  getMyMedia,
  getAllMedia,
  getMedia,
  updateMedia,
  deleteMedia
} = require('../controllers/mediaController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

// Validation rules
const updateMediaValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Title must be 2-100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
];

// Public routes
router.get('/', getPublicMedia);
router.get('/:id', getMedia);

// Protected routes
router.post('/', protect, upload.single('file'), uploadMedia);
router.get('/user/my', protect, getMyMedia);
router.put('/:id', protect, updateMediaValidation, validate, updateMedia);
router.delete('/:id', protect, deleteMedia);

// Admin routes
router.get('/admin/all', protect, admin, getAllMedia);

module.exports = router;
