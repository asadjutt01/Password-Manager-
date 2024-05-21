
const express = require('express')
const { MongoClient } = require('mongodb');

const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')

 



// or as an es module:
// import { MongoClient } from 'mongodb'
dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())
client.connect();

//Get all the passwords 
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save a the passwords
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ Success: true,result:findResult })
})

// Delete a the passwords



app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ Success: true,result:findResult })
})



app.listen(port, () => { 
    console.log(`Example app listening on port http://localhost:${port}`)
})