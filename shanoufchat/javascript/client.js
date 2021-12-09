//including the 8000 port(socket.io server)
const socket = io('http://localhost:8000');
//obtaining the DOM elements
const form = document.getElementById('form');
const messageinput = document.getElementById('input');
const messagecontainer = document.getElementById('container');
//audio
const audio = new Audio('ting.mp3');
//function to append event info into the container
const append = (message, position) =>{
    const messageelement=document.createElement('div');
    messageelement.innerHTML=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if(position=='left'){
        audio.play();
    }
}
//aksing the users for their name
const name=prompt('What is your name?','User');
socket.emit('new-user-joined', name);
//appending the new user's name in the container
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');
});
//receiving a message send by the server
socket.on('receive', data=>{
    append(`${data.name}:${data.message}`, 'left');
});
//on user leaving the chat
socket.on('went', name=>{
    append(`${name} left the chat`, 'right');
});
//on pressing the send button
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value='';
});