const socket = io();

const msgList = document.createElement('li');
const msgBox = document.getElementById('message-input')
const form = document.getElementById('form');
const btn = document.getElementById('send-button')
const ul = document.getElementById('messages')

const username =  prompt("Enter Your Name");

btn.onclick = ()=>{
    socket.emit('msg_send', {
        msg : msgBox.value,
        username
    })

    msgBox.value="";
    console.log("clicked")
}


socket.on('msg_received', (data)=>{
    console.log(data);
    const li = document.createElement('li');

    li.innerText= "Message By: "+ data.username +" :"+ data.msg;

    ul.appendChild(li);

    

})
