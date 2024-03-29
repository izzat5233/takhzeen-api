const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@takhzeencluster.spizhqq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

try {
    conn = client.connect();
} catch (e) {
    console.error(e);
}

function getDB() {
    return client.db(process.env.DB_NAME);
}

function isValidObjectId(id) {
    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

module.exports = {getDB, isValidObjectId};
