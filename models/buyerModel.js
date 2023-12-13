const mongoose = require('mongoose');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scehma or database design for BUYER
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    mobileNumber:{
        type : Number,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
})


const Buyer = mongoose.model('Buyer',buyerSchema);

module.exports = Buyer;