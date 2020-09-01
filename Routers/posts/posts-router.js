const express = require('express');
const server = express()
const db = require('../../data/db');
const router = express.Router();
const commentsRouter = require('../comments/comments-router');

server.use('/:id/comments', commentsRouter)
router.get('/', (req, res) => {
    res.status(200).json({ hello: 'world' })
})
router.post('/', (req, res) => {
    const post = req.body
    // db.insert(post)

    if (!db) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    } else if (req.body.title && req.body.contents) {
        db.insert(post)
            .then(dbres => {
                if (dbres) {
                 db.findById(dbres).then(a => res.status(201).json(a))
                } else {
                    res.status(500).json({ error: "There was an error while saving the post to the database" })
                }
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})


    // router.get('/:id', (req, res) => {

    // })
    // router.delete('/:id', (req, res) => {

    // })
    // router.put('/:id', (req, res) => {

    // })
    module.exports = router;