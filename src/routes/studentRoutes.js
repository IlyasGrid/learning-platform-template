const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes pour les cours
router.post('/', studentController.createCourse);
router.get('/:id', studentController.getCourse);
router.get('/stats', studentController.getCourseStats);

module.exports = router;