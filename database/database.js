const mongoose = require('mongoose');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// extablishing a data base connection pool to use it wherever we require
const connectToDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Database Online ${connect.connection.host}`);
    }
    catch(err){
        console.log(`Some Error occured in MongoDB connection : ${err}`);
    }
} 

module.exports = connectToDb;