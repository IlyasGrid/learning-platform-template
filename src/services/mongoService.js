// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');
const db = require('../config/db');

// Fonctions utilitaires pour MongoDB
async function createCourse(course) {  
  
  const collection = db.db.collection('courses');
  
  console.log(collection);
  const result = await collection.insertOne(course);
  
  return result;
}

async function getCourse(id) {
  const collection = db.db.collection('courses');
  
  const course = await collection.findOne({ _id:new ObjectId(id) });
  return course;
}

async function getCourseStats() {
  const collection = db.db.collection('courses');
  const stats = await collection.aggregate([
    { $group: { _id: null, totalCourses: { $sum: 1 } } }
  ]).toArray();
  return stats[0];
}

async function createStudent(student) {
  const collection = db.db.collection('students');
  const result = await collection.insertOne(student);
  return result;
}

async function getStudent(id) {
  const collection = db.db.collection('students');  
  const student = await collection.findOne({ _id: new ObjectId(id) });  
  return student;
}

async function getStudentStats() {
  const collection = db.db.collection('students');
  const stats = await collection.aggregate([
    { $group: { _id: null, totalStudents: { $sum: 1 } } }
  ]).toArray();
  return stats[0];
}

// Export des services
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
  createStudent,
  getStudent,
  getStudentStats,
};