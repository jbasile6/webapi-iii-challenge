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
    //**note to self DO NOT MAKE THAT MISTAKE AGAIN, check key:value names of correct database
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

//POST new users, name should be uppercase
router.post('/', (req, res) => {
    Users.insert(req.body)
        .then( newUser => {
            res.status(201).json(newUser);
        })
        .catch( err => {
            res.status(500).json({ error: 'Error creating new user' })
        })
});

//DELETE user with specific ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Users.remove(id)
        .then(user => {
            res.status(200).json({ message: `User with id number ${id} deleted` })
        })
        .catch( err => {
            res.status(500).json({ error: `Error deleting user with id number ${id}` })
        })
})

//PUT update user by ID, new name should remain capitalized
router.put('/:id', (req, res) => {
    const id = req.params.id;

    Users.update(id, req.body)
        .then(updatedUser => {
            res.status(200).json({ message: `User with id number ${id} has been updated` })
        })
        .catch( err => {
            res.status(500).json({ error: `Error updating user with id number ${id}`})
        })
})




module.exports = router;