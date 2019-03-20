const express = require('express');

const Users = require('../data/helpers/userDb');

const router = express.Router();

//GET all users
router.get('/', (req, res) => {
    Users.get()
        .then( user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: 'Error getting users' })
        })
})

//GET user by userID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Users.getById(id)
        .then( user => {
            res.status(200).json(user);
        })
        .catch( err => {
            res.status(500).json({ error: 'There was an error getting the user'})
        })
})

//GET user posts by userID
router.get('/posts/:id', (req, res) => {
    //spent 45 min debugging because i had '/posts/:user_id'
    //**note to self DO NOT MAKE THAT MISTAKE AGAIN
    const userId = req.params.id;

    Users.getUserPosts(userId)
        .then( posts => {
            if(posts.length === 0) {
                res.status(400).json({ error: 'This user has no posts' })
            } else {
            res.status(200).json(posts);
        }
        })
        .catch( err => {
            res.status(500).json({ error: 'There was an error getting this user\'s posts' })
        })
})



module.exports = router;