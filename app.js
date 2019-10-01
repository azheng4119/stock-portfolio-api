const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const symbols = require('./routes/symbols')
const users = require('./routes/users')
const server = express();

server.use(cors());

server.use('/symbols',symbols);
server.use('/user',users);

server.get('/',(req,res,next) => {
    res.send('User path /symbols to search')
})

server.listen(port,() => console.log(`Server listening on port ${port}`));

