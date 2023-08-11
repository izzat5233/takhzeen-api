const express = require('express');
const {ObjectId} = require("mongodb");
const router = express.Router();
const {authenticateJWT, signJWT} = require("../config/jwt");
const {getDB} = require('../config/db');
const forms = getDB().collection("forms");

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
                res.send("Not Found").status(404);
            } else {
                res.send(result).status(200);
            }
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

router.post('/', function (req, res) {
    const form = req.body;
    forms.insertOne(form)
        .then(result => {
            // Generate a token with the _id as the payload
            const token = signJWT({formId: result.insertedId});
            res.status(201).send({token, result});
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

router.get('/', authenticateJWT, function (req, res) {
    const formId = req.body.payload

    forms.findOne({_id: new ObjectId(formId)})
        .then(result => {
            if (!result) {
                res.send("Not Fount").status(404);
            } else {
                res.send(result).status(200);
            }
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

router.patch('/', authenticateJWT, function (req, res) {
    const form = req.body;
    const {formId} = req.payload

    forms.updateOne({_id: new ObjectId(formId)}, {$set: form})
        .then(result => {
            res.send(result).status(200);
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

module.exports = router;