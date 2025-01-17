// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    const course = req.body;
    const result = await mongoService.createCourse(course);
    await redisService.cacheCourse(result._id, result); // Cache the course in Redis
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    let course = await redisService.getCachedCourse(courseId); // Try to get course from Redis
    if (!course) {
      course = await mongoService.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      await redisService.cacheCourse(courseId, course); // Cache the course in Redis
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get course' });
  }
}

async function getCourseStats(req, res) {  
  try {
    const stats = await mongoService.getCourseStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get course stats' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};