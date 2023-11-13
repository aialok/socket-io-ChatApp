const mongoose = require('mongoose');

const connect = async ()=>{
   mongoose.connect('mongodb://127.0.0.1:27017/chatDB').then((data)=>{
    console.log("MongoDB is connected successfully")
   })
}

module.exports = connect;