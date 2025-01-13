// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse :
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse :

const { MongoClient } = require("mongodb");
const redis = require("redis");
const config = require("./env");

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    const client = new MongoClient(config.mongodb.uri);
    await client.connect();
    console.log("Connected to MongoDB successfully");
    db = client.db(config.mongodb.dbName);
    mongoClient = client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
};
