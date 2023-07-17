const express = require('express');
const {ObjectId} = require("mongodb");
const router = express.Router();
const getDB = require('../config/db');
const forms = getDB().collection("find_forms");

router.get('/', function (req, res) {
    forms.find().toArray()
        .then(result => {
            res.send(result).status(200);
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

router.get('/:id', function (req, res) {
    forms.findOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            if (!result) {
                res.send("Not Found").status(404)
            } else {
                res.send(result).status(200);
            }
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

router.post('/', function (req, res, next) {
    const form = req.body;
    forms.insertOne(form)
        .then(result => {
            res.send(result).status(201);
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

module.exports = router;