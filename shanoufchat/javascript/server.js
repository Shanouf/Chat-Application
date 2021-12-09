//bringing in the socket.io module and defining a variable
const io = require('socket.io')(8000, {
    cors: {
        origin:'*',
    }
});
const users = {};
//functions to run on connection
io.on('connection', socket=>{
    //while a new user joins
    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
    });
    //while a user sends a message
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message:message, name: users[socket.id]});
    });
    //while a user leaves the chat
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('went', users[socket.id]);
        delete users[socket.id];
    });
});