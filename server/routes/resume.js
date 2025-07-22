// const express = require('express');
// const router = express.Router();
// const Resume = require('../models/Resume');
// const { generateSummary } = require('../controllers/openaiControllers');

// router.post('/generate', async (req, res) => {
//   const summary = await generateSummary(req.body.data);
//   res.send({ summary });
// });

// router.post('/save', async (req, res) => {
//   const resume = new Resume(req.body);
//   await resume.save();
//   res.send({ message: 'Resume saved' });
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { generateSummary } = require('../controllers/openaiControllers');
const jwt = require('jsonwebtoken');

// Multer and Cloudinary setup
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Image upload endpoint
const streamifier = require('streamifier');

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'resume_images' },
      (error, result) => {
        if (error) return res.status(500).json({ message: 'Cloudinary upload failed', error });
        return res.json({ url: result.secure_url });
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ message: 'Image upload failed', error: err.message });
    }
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

router.post('/generate', async (req, res) => {
  const summary = await generateSummary(req.body.data);
  res.send({ summary });
});

router.post('/save', authMiddleware, async (req, res) => {
  const resume = new Resume({
    userId: req.userId,
    template: req.body.template,
    data: req.body.data,
  });
  await resume.save();
  res.send({ message: 'Resume saved' });
});

router.get('/mine', authMiddleware, async (req, res) => {
  const resumes = await Resume.find({ userId: req.userId }).sort({ _id: -1 });
  res.send(resumes);
});

// Delete resume
router.delete('/:id', authMiddleware, async (req, res) => {
  await Resume.deleteOne({ _id: req.params.id, userId: req.userId });
  res.send({ message: 'Deleted' });
});

// Update resume
router.put('/:id', authMiddleware, async (req, res) => {
  const updated = await Resume.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.send(updated);
});

module.exports = router;
