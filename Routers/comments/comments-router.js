const express = require('express');
const db = require('../../data/db');
const { json } = require('express');
const router = express.Router({
    mergeParams: true,
});

router.get('/', (req, res) =>{
    res.status(200).json({hello: 'world'})
})
// router.post('/:id', (req, res) =>{
    
// })
module.exports = router;