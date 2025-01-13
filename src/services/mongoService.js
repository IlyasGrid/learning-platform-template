// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');
const db = require('../config/db');

// Fonctions utilitaires pour MongoDB
async function createCourse(course) {
  const collection = db.db.collection('courses');
  const result = await collection.insertOne(course);
  return result.ops[0];
}

async function getCourse(id) {
  const collection = db.db.collection('courses');
  const course = await collection.findOne({ _id: ObjectId(id) });
  return course;
}

async function getCourseStats() {
  const collection = db.db.collection('courses');
  const stats = await collection.aggregate([
    { $group: { _id: null, totalCourses: { $sum: 1 } } }
  ]).toArray();
  return stats[0];
}

// Export des services
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};