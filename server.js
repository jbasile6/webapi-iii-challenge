const express = require('express');
const helmet = require('helmet');

const postsRouter = require('./routers/postsRouter');
const usersRouter = require('./routers/usersRouter');

const server = express();

//Middleware-------------------------------------------------------------------------------------------------
function upperCaseName( req, res, next) {
    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase();
        next();
    } else {
        next();
    }
}

//Middleware^^^^^^^^^^---------------------------------------------------------------------------------------

server.use(express.json());
server.use(helmet());
server.use(upperCaseName);

//routing
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);



server.get('/', (req, res, next) => {
    res.status(200).json({ greeting: process.env.GREETING })
});


module.exports = server;