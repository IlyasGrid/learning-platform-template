const db = require('../config/db');

// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl = 3600) {
  try {
    await db.redisClient.set(key, JSON.stringify(data), 'EX', ttl);
  } catch (error) {
    console.error('Error caching data in Redis:', error);
  }
}

async function getCachedData(key) {
  try {
    const data = await db.redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached data from Redis:', error);
    return null;
  }
}

async function cacheStudent(id, student) {
  await cacheData(`student:${id}`, student);
}

async function getCachedStudent(id) {
  return await getCachedData(`student:${id}`);
}

async function cacheCourse(id, course) {
  await cacheData(`course:${id}`, course);
}

async function getCachedCourse(id) {
  return await getCachedData(`course:${id}`);
}

// Export des services
module.exports = {
  cacheData,
  getCachedData,
  cacheStudent,
  getCachedStudent,
  cacheCourse,
  getCachedCourse,
};