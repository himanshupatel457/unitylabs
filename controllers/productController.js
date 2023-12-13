const Buyer = require('../models/buyerModel');
const Seller = require('../models/sellerModel');
const { getTokenDetails } = require('../utils/authUtils');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// this is to load  products for Seller

const getCatalogUpdated = async (req, res, next) => {
    try {
        const products = req.body.products;
        const token = req.cookies.seller;
        const decoded = await getTokenDetails(token);
        const seller = await Seller.findById(decoded._id);
        const uniqueProducts = products.filter(newProduct =>
            !seller.catalog.some(existingProduct => existingProduct.productName === newProduct.productName)
        );
        seller.catalog = [...uniqueProducts, ...seller.catalog];
        await seller.save();
        // console.log(products);
        res.status(200).send({
            success : true,
            message : `Products added `
        });
    } catch (error) {
        console.log(`Error in catalog updation: ${error}`);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};




module.exports = {getCatalogUpdated};
