const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

// middle war
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6soco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connection success');

        // database and collection
        const database = client.db("skyDB");
        const servicesCollection = database.collection('services');

        // insert Services
        app.post('/addService', async (req, res) => {
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
            res.send(result);
        })

        // read read service
        app.get('/service', async (req, res) => {
            const result = await servicesCollection.find({}).toArray();
            res.send(result)
        })


    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);




//----------------------------- home page-----------------------------
app.get('/', (req, res) => {
    res.send('welcome to sky stars');
})
app.listen(port, () => {
    console.log(`skyStars Server listening at http://localhost:${port}`)
})
//----------------------------- home page-----------------------------