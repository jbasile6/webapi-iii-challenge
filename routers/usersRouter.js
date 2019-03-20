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




module.exports = router;