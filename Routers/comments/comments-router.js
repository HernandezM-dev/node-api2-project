const express = require('express');
const db = require('../../data/db');
const { json } = require('express');
const { insertComment } = require('../../data/db');
const router = express.Router({
    mergeParams: true,
});

router.get('/', (req, res) =>{
    const id = req.params.id
    db.findPostComments(id)
    .then(commentsRes =>{
        res.status(200).json(commentsRes)
    })

})
router.post('/', (req, res) =>{
    const id = req.params.id
    if (!db) {
        res.status(500).json({ error: "Could not find database" })
    } else {
        db.findById(id)
            .then(dbres => {
                if (dbres.length === 0) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                } else {
                    db.insertComment({...req.body, post_id: id })
                    .then(insertRes =>{
                        res.status(200).json({message: "it worked"})
                    })
                    .catch(err => res.status(500).json({message: "could not add comment"}))
                }
            })
            .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
    }
})
module.exports = router;