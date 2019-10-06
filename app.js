const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const symbols = require('./routes/symbols')
const users = require('./routes/users')
const db = require('./database');

const server = express();

server.use(cors());

server.use('/symbols', symbols);
server.use('/user',users);

server.get('/', (req, res, next) => {
    res.send('User path /symbols to search')
})

// db.sync({
//     force :true
// })

if (db) {
    server.listen(port, () => console.log(`DB connected. Server listening on port ${port}`));
} else {
    console.log('Database not connected.');
}


