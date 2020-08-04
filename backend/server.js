const express = require('express');
const socket = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        console.log('joined');
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` });
        socket.emit('playerNum', { player_num: user.player_num });

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room , users: getUsersInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left!`})
        }
    });

    socket.on('move', (move) => {
        const user = getUser(socket.id);
        socket.broadcast.to(user.room).emit('move', move);
    })
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));