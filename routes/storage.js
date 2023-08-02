const express = require('express');
const router = express.Router();
const getDB = require('../config/db');
const storages = getDB().collection("storages");

router.get('/', function (req, res) {
    storages.find().toArray()
        .then(result => {
            res.send(result).status(200);
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

module.exports = router;
