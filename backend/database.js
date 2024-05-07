const { MongoClient } = require('mongodb');

// // Connection URL
// const url = 'mongodb+srv://alex:alex1234@mediadb.udnf01m.mongodb.net/?retryWrites=true&w=majority&appName=mediadb';

const url = 'mongodb+srv://alex:alex1234@mediadb.udnf01m.mongodb.net/?retryWrites=true&w=majority&appName=mediadb';
const client = new MongoClient(url);
    
const dbName = 'mediadb';
  
class DatabaseController {

    static listItems = async (collection, filter) => {
        return (await this.getDBConnection()).collection(collection).find(filter).toArray();
    }

    static addItem = async (collection, object) => {
        return (await this.getDBConnection()).collection(collection).insertOne(object);
    }

    static insertItem = async (collection, object) => {
        return (await this.addItem(collection, object));
    }

    static getDBConnection = async () => {
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
}
module.exports = DatabaseController