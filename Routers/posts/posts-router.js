const express = require('express');
// const server = express()
const db = require('../../data/db');
const router = express.Router();
const commentsRouter = require('../comments/comments-router');
const { remove, find } = require('../../data/db');

router.use('/:id/comments', commentsRouter)
router.get('/', (req, res) => {
    
    if (!db) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }else{
        find()
        .then(postRes =>{
            res.status(200).json(postRes)
        })
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }))
    }
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
                    db.findById(dbres.id)
                        .then(a => res.status(201).json(a))
                } else {
                    res.status(500).json({ error: "There was an error while saving the post to the database" })
                }
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!db) {
        res.status(500).json({ error: "Could not find database" })
    } else {
        db.findById(id)
            .then(dbres => {
                if (dbres.length === 0) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                } else {
                    res.status(200).json(dbres)
                }
            })
            .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
    }
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    if (!db) {
        res.status(500).json({ error: "Could not find database" })
    } else {
        db.findById(id)
            .then(dbres => {
                if (dbres.length === 0) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                } else {
                    db.remove(id)
                        .then(removeres => {
                            if (removeres) {
                                res.status(200).json({ message: "Post Deleted" })
                            } else {
                                res.status(500).json({ error: "Nope" })
                            }

                        })
                        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
                }
            })
            .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
    }
})
router.put('/:id', (req, res) => {

    const id = req.params.id

    if (!db) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    } else if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.findById(id)
            .then(dbres => {
                if (dbres.length === 0) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                } else {
                    db.update(id, req.body)
                        .then(updateRes => {
                            if (updateRes === 1) {
                                res.status(200).json({ message: "Updated Successfully" })
                            }
                            })
                        .catch(err => res.status(500).json({ error: "Could not process update" }))
                }
            })
            .catch(err => res.status(500).json({message: "could not look for id"}))
        }
})

// router.get('/:id/comments', (req, res) =>{
//     const id = req.params.id
//     db.findPostComments(id)
//     .then(commentsRes =>{
//         res.status(200).json(commentsRes)
//     })

// })
module.exports = router;