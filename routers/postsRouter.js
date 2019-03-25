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
    Posts.insert(req.body)
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(err => {
            res.status(500).json({ error: "Error posting new post" })
        })
})

//DELETE posts with specific ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Posts.remove(id)
        .then(post => {
            res.status(200).json({ message: `Post with id number ${id} has been removed` })
        })
        .catch( err => {
            res.status(500).json({ error: `Error removing post with id number ${id}` })
        })
})

//PUT update post by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;

    Posts.update(id, req.body)
        .then(updatedPost => {
            res.status(200).json({ message: `Post with id number ${id} has been updated` })
        })
        .catch( err => {
            res.status(500).json({ error: `Error updating post with id number ${id}`})
        })
})



module.exports = router;