const mongoose = require('mongoose');



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Schema or database design for SELLER
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
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
    catalog:[
        {
            productName : {
                type : String,
                required : true,
                trim : true,
                unique: true,
            },
            price : Number,

        }
    ]
})


const Seller = mongoose.model('Seller',sellerSchema);

module.exports = Seller;