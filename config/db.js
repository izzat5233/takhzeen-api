const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@takhzeencluster.spizhqq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let conn;
let db;
try {
    conn = await client.connect();
    db = await conn.db(process.env.DB_NAME);
    await db.command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (e) {
    console.error(e);
}

module.export = db;