const express = require('express');
const helmet = require('helmet');

const postsRouter = require('./routers/postsRouter');
const usersRouter = require('./routers/usersRouter');

const server = express();

//Middleware-------------------------------------------------------------------------------------------------


//Middleware^^^^^^^^^^---------------------------------------------------------------------------------------

server.use(express.json());
server.use(helmet());

//routing
server.use('/api/posts', postsRouter);



server.get('/', (req, res) => {
    res.send('WEB API CHALLENGE III')
});


module.exports = server;