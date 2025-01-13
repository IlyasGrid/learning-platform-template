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
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
}

async function getStudent(req, res) {
  try {
    const studentId = req.params.id;
    const student = await mongoService.getStudent(ObjectId(studentId));
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
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
  createCourse,
  getCourse,
  getCourseStats,
  createStudent,
  getStudent,
  getStudentStats,
};