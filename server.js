const express = require('express');
const app = express();
const http = require ('http').createServer(app);
const path = require ('path');

const io = require('socket.io')(http);

let rooms = 0;

const clients = {};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const addClient = socket => {
    console.log("Player has connected". socket.id)
    clients[socket.id] = socket;
}

const removeClient = socket => {
    console.log("Player has disconnected", socket.id);
    delete clients[socket.id];
}


io.on('connection', socket => {

    let id = socket.id;
    addClient(socket);

    socket.on('disconnect', () => {
        removeClient(socket);
        socket.broadcast.emit("player has disconnected another time", id);
    })

    // console.log('a user is connected');

    // socket.on('disconnect', () =>{
    //     console.log('user disconnected');
    // })
});

http.listen(3000, () => {
    console.log("Listening on port 3000");
});


