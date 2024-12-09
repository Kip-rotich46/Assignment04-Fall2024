const { MongoClient, ServerApiVersion } = require('mongodb');

// Temporary hardcoding the URI for testing
const uri = "mongodb+srv://protio:protio@cluster0.dro4v.mongodb.net/assignment4?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    return client.db('assignment4');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };
