const express = require('express');
const router = express.Router();
const {getDB, isValidObjectId} = require('../config/db');
const {ObjectId} = require("mongodb");
const storages = getDB().collection("storages");

router.get('/', function (req, res) {
    const fields = req.query['fields'];
    let projection = {};

    if (fields) {
        fields.split(',').forEach(field => {
            projection[field] = 1;
        });
    }

    storages.find({}, {projection: projection}).toArray()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/:storageId', function (req, res) {
    const storageId = req.params['storageId'];
    const fields = req.query['fields'];
    let projection = {};

    if (!isValidObjectId(storageId)) {
        return res.status(400).send("Invalid storage ID format");
    }

    if (fields) {
        fields.split(',').forEach(field => {
            projection[field] = 1;
        });
    }

    storages.findOne({_id: new ObjectId(storageId)}, {projection: projection})
        .then(result => {
            if (!result) {
                res.status(404).send("Storage not found");
            } else {
                res.status(200).send(result);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

module.exports = router;
