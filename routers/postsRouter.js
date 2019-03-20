const express = require('express');

const Posts = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res, next) => {
    Posts.get()
        .then( post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error getting posts'})
        })
})


module.exports = router;