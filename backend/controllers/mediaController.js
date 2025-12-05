const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');

// @desc    Upload media
// @route   POST /api/media
// @access  Private
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const { title, description, isPublic } = req.body;

    const media = await Media.create({
      title: title || req.file.originalname,
      description: description || '',
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      user: req.user._id,
      isPublic: isPublic !== 'false'
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('UploadMedia error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all public media
// @route   GET /api/media
// @access  Public
const getPublicMedia = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    const media = await Media.find({ isPublic: true })
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Media.countDocuments({ isPublic: true });

    res.json({
      media,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('GetPublicMedia error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's media
// @route   GET /api/media/my
// @access  Private
const getMyMedia = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    const media = await Media.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Media.countDocuments({ user: req.user._id });

    res.json({
      media,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('GetMyMedia error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all media (admin)
// @route   GET /api/media/all
// @access  Private/Admin
const getAllMedia = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    const media = await Media.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Media.countDocuments();

    res.json({
      media,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('GetAllMedia error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single media
// @route   GET /api/media/:id
// @access  Public/Private
const getMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate('user', 'name');
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Check if media is public or belongs to user
    if (!media.isPublic && (!req.user || !media.user.equals(req.user._id))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(media);
  } catch (error) {
    console.error('GetMedia error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update media
// @route   PUT /api/media/:id
// @access  Private
const updateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Check ownership or admin
    if (!media.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this media' });
    }

    const { title, description, isPublic } = req.body;
    
    media.title = title || media.title;
    media.description = description !== undefined ? description : media.description;
    media.isPublic = isPublic !== undefined ? isPublic : media.isPublic;

    await media.save();
    res.json(media);
  } catch (error) {
    console.error('UpdateMedia error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Check ownership or admin
    if (!media.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this media' });
    }

    // Delete file from uploads folder
    const filePath = path.join(__dirname, '../uploads', media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await media.deleteOne();
    res.json({ message: 'Media removed' });
  } catch (error) {
    console.error('DeleteMedia error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  uploadMedia,
  getPublicMedia,
  getMyMedia,
  getAllMedia,
  getMedia,
  updateMedia,
  deleteMedia
};
