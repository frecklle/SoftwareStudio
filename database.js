const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://admin:1234567890@softwarestudio.jvkfupg.mongodb.net/?retryWrites=true&w=majority&appName=SoftwareStudio';
const client = new MongoClient(url);

// Database Name
const dbName = 'SoftwareStudio';

await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
//const collection = db.collection('documents');

export default db;
  