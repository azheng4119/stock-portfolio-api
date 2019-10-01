const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const server = express();

server.use(cors)

server.get('/',(req,res,next) => {
    console.log(1222);
    res.send('User path /symbols to search')
})

server.listen(port,() => console.log(`Server listening on port ${port}`));

