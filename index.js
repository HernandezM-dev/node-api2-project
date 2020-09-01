//server setup
const express = require('express');
// const db = require('./data/db.js')
const server = express();
server.use(express.json());

//routers
const postRouter = require('./Routers/posts/posts-router')


//calls to endpoints
server.use('/api/posts', postRouter)

server.get('/', (req,res) =>{
})

//server listener 
const port = 8000
server.listen(port, () =>{
    console.log(`\n***Server Running on http://localhost:${port} ***\n`)
})