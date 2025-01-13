// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse :
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse :

const { MongoClient } = require("mongodb");
const redis = require("redis");
const config = require("./env");

let mongoClient, redisClient, db;

async function connectMongo() {
    // TODO: Implémenter la connexion MongoDB
    try {
      const client = new MongoClient(config.mongodb.uri);
      await client.connect();
      console.log("Connected to MongoDB successfully");
      db = client.db(config.mongodb.dbName);
      mongoClient = client;
      // Gérer les erreurs et les retries
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function connectRedis() {
    // TODO: Implémenter la connexion Redis
    try {
      redisClient = redis.createClient({
        url: config.redis.uri,
      });
      redisClient.on("error", (err) => {
        console.error("Error connecting to Redis:", err);
      });
      await redisClient.connect();
      console.log("Connected to Redis successfully");
      // Gérer les erreurs et les retries
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
};
