const mongoose = require('mongoose');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Schema or database design for ORDER
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyer:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Buyer"
    },
    orderItems: [{
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
    }],
    orderTotal :{
        type : Number,
        required :true,
        default : 0
    },
    seller:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Seller"
    }
},{timestamps : true})


const Order = mongoose.model('Order',orderSchema);

module.exports = Order;