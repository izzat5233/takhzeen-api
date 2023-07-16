const express = require('express');
const router = express.Router();
const client = require('../config/db');
const db = client.db(process.env.DB_NAME);

router.post('/', function (req, res, next) {
    const collection = db.collection("find_forms");
    const document = req.body;
    document.date = new Date();
    const result = collection.insertOne(document);
    res.send(result).status(204);
});

module.exports = router;