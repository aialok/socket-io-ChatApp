

const socket = io();

socket.on('server', (arg, callback)=>{
    const heading=document.createElement('h1');
    heading.innerHTML=arg;
    document.body.appendChild(heading);
    console.log("new message")

    

})

socket.emit('client')