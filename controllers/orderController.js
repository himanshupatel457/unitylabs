const Buyer = require('../models/buyerModel');
const Seller = require('../models/sellerModel');
const Order = require('../models/orderModel');
const { getTokenDetails } = require('../utils/authUtils');




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ORDER preparation 
const getOrderFromBuyer = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const products = req.body.products;
        const token = req.cookies.buyer;
        if(!id || products.length<1) {
            return res.status(200).send({
                message : ` order parameters are not available`,
            })
        }
        // console.log(token);
        const decoded = await getTokenDetails(token);
        const seller = await Seller.findById({_id:id});
        const catalog = seller.catalog;

        const order = products.map(product => {
            const catalogProduct = catalog.find(catalogItem => catalogItem._id == product._id);
            if (catalogProduct) {
                return {
                    productName: catalogProduct.productName,
                    quantity: product.quantity,
                    totalPrice: catalogProduct.price * product.quantity,
                };
            }
            // console.log(catalogProduct)
        });

        const overallTotal = order.reduce((acc, orderItem) => acc + orderItem.totalPrice, 0);
        const buyer = decoded._id;
        // CREATING A ORDER
        const orderPlaced = new Order({seller:id,buyer, orderTotal:overallTotal,orderItems:order });
        orderPlaced.save();

        return res.status(201).send({
            success: true,
            message: `User signedUp successflly`,
            orderPlaced
        })
    } catch (error) {
        console.log(`some error in making order : ${error}`);
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  FETCH orders from Orders , Seller Id will be available via token or token in cookie
const getAllOders = async (req,res,next) =>{
    try {

        // this will be protected and will called for seller only means we have  token 
        const token = req.cookies.seller;
        const decoded = await getTokenDetails(token);
        console.log(decoded);
        const orders = await Order.find({seller : decoded._id});
        if(!orders){
            return res.status(200).send({
                message : `orders are not found`,
            })

        }
        res.status(200).send({
            message :`orders found`,
            orders
        })

    } catch (error) {
        console.log(`some error in fetching orders to a seller ${error}`)
    }
}
module.exports = {getOrderFromBuyer,getAllOders}