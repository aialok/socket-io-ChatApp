const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const connect = async ()=>{
   mongoose.connect(MONGO_DB_URI).then(()=>{
    console.log("MongoDB is connected successfully")
   })
}

module.exports = connect;