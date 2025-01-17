// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createStudent(req, res) {
  try {
    const student = req.body;
    const result = await mongoService.createStudent(student);
    await redisService.cacheStudent(result._id, result); // Cache the student in Redis
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
}

async function getStudent(req, res) {
  try {
    const studentId = req.params.id;
    let student = await redisService.getCachedStudent(studentId); // Try to get student from Redis
    if (!student) {
      student = await mongoService.getStudent(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      await redisService.cacheStudent(studentId, student); // Cache the student in Redis
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get student' });
  }
}

async function getStudentStats(req, res) {
  try {
    const stats = await mongoService.getStudentStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get student stats' });
  }
}

// Export des contrôleurs
module.exports = {
  createStudent,
  getStudent,
  getStudentStats,
};