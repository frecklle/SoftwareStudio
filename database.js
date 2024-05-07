const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://alex:alex1234@mediadb.udnf01m.mongodb.net/?retryWrites=true&w=majority&appName=mediadb';
const client = new MongoClient(url);

// Database Name
const dbName = 'SoftwareStudio';

async function connectToDatabase() { 
    try {
        await client.connect();
        console.log("Connected successfully");
        const db = client.db(dbName)
        return db;
    } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
module.exports = connectToDatabase();
  