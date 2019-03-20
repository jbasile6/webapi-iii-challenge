const express = require('express');

const Posts = require('../data/helpers/postDb');

const router = express.Router();

//GET all posts
router.get('/', (req, res, next) => {
    Posts.get()
        .then( post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error getting the posts'})
        })
})

//GET posts by ID
router.get('/:id', (req, res) => {
    const { id }  = req.params.id;

    Posts.getById(id)
        .then( post => {
            res.status(200).json(post);
        })
        .catch( err => {
            res.status(500).json({ error: 'There was an error getting the post'})
        })
})

//POST new posts
router.post('/', (req, res) => {
    //req.body.user_id = 9;
    Posts.insert(req.body)
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(err => {
            res.status(500).json({ error: "Error posting new post" })
        })
})




module.exports = router;