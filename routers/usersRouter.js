const express = require('express');

const Users = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {
    Users.get()
        .then( user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: 'Error getting users' })
        })
})

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



module.exports = router;