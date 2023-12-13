const Buyer = require('../models/buyerModel');
const JWT = require('jsonwebtoken');
const { hashThisPassword, comparePassword } = require('../utils/authUtils');
const Seller = require('../models/sellerModel');




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// login Using Mobile Number and password
const buyerLoginController = async (req, res, next) => {

    try {
        const { mobileNumber, password } = req.body;
        if (!mobileNumber) return res.send({ message: `mobileNumber is missing` });
        if (!password) return res.send({ message: `password is missing` });
        const user = await Buyer.findOne({ mobileNumber });
        
        if (!user) {
            return res.status(200).send({
                success: false,
                message: `User Not Found `,
                user
            })
        }

        const matched = await comparePassword(password, user.password);

        if (!matched) {
            return res.status(200).send({
                success: false,
                message: `INVALID CREDENTIALS`
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
        res.cookie('buyer', token, {
            expires: new Date(Date.now() + 4233600),
            httpOnly: true,
            secure: false,
        })
        res.status(200).send({
            success: true,
            message: `LOGIN SUCCESSFUL`,
            user: {
                name: user.name,
                mobileNumber: user.mobileNumber,
            },
            token
        });

    } catch (error) {
        console.log(`error in buyer login : ${error}`);
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// signUp Using Mobile Number , name and password
const buyerSignUpController = async (req, res, next) => {
    try {
        const { name, mobileNumber, password } = req.body;

        //validating existence
        if (!name) return res.send({ message: `name is missing` });
        if (!mobileNumber) return res.send({ message: `mobileNumber is missing` });
        if (!password) return res.send({ message: `password is missing` });

        //check if already we have a user
        const existingUser = await Buyer.findOne({ mobileNumber });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: `Already an existing Please Loging to Continue `,
                existingUser
            })
        }

        //password encryption
        const hashedPassword = await hashThisPassword(password);

        const user = new Buyer({ name, mobileNumber, password: hashedPassword });
        user.save();

        return res.status(201).send({
            success: true,
            message: `User signedUp successflly`,
            user
        })

    } catch (error) {
        console.log(`error in buyer signup controller : ${error}`);
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// login Using Mobile Number and password
const sellerLoginController = async (req, res, next) => {

    try {
        const { mobileNumber, password } = req.body;
        console.log(mobileNumber, password);
        if (!mobileNumber) return res.send({ message: `mobileNumber is missing` });
        if (!password) return res.send({ message: `password is missing` });
        const user = await Seller.findOne({ mobileNumber });
        // console.log(user);
        if (!user) {
            return res.status(200).send({
                success: false,
                message: `User Not Found `,
                user
            })
        }

        const matched = await comparePassword(password, user.password);

        if (!matched) {
            return res.status(200).send({
                success: false,
                message: `INVALID CREDENTIALS`
            })
        }

        // we have two ways to deal with token either we can store in some store or local storage at client's end or in cookie to keep it secure
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
        res.cookie('seller', token, {
            expires: new Date(Date.now() + 4233600),
            httpOnly: true,
            secure: true,
        })
        res.status(200).send({
            success: true,
            message: `LOGIN SUCCESSFUL`,
            user: {
                name: user.name,
                mobileNumber: user.mobileNumber,
                catalog: user.catalog,
            },
            token
        });

    } catch (error) {
        console.log(`error in buyer login : ${error}`);
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// signup Using Mobile Number ,name and password
const sellerSignUpController = async (req, res, next) => {
    try {
        const { name, mobileNumber, password } = req.body;

        if (!name) return res.send({ message: `name is missing` });
        if (!mobileNumber) return res.send({ message: `mobileNumber is missing` });
        if (!password) return res.send({ message: `password is missing` });

        const existingUser = await Seller.findOne({ mobileNumber });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: `Already an existing Please Loging to Continue `,
                existingUser
            })
        }



        const hashedPassword = await hashThisPassword(password);
        const user = new Seller({ name, mobileNumber, password: hashedPassword });
        user.save();


        return res.status(200).send({
            success: true,
            message: `User signedUp successflly`,
            user
        })

    } catch (error) {
        console.log(`error in buyer signup controller : ${error}`);
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lFetch all users from database
const getAllSellers = async (req, res, next) => {
    try {
        const allSellers = await Seller.find();
        if (!allSellers) {
            return res.status(200).send({
                message: `Now sellers Found `,
            })
        }

        res.status(200).send({
            message: `sellers found`,
            "allSellers": allSellers.map(seller => ({
                "_id": seller._id,
                "name": seller.name,
                "mobileNumber": seller.mobileNumber,
            }))
        })
    } catch (error) {
        console.log(`some error errored in showing all buyers : ${error} `)
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fetch a particular user from datbase
const getParticularSeller = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const {catalog} = await Seller.findById({_id:id});
        console.log(catalog);
        res.status(200).send({
            catalog
        })
    } catch (error) {
        console.log(`error occured in getting particular seller`)
    }
}

module.exports = { buyerSignUpController, buyerLoginController, sellerSignUpController, sellerLoginController, getAllSellers,getParticularSeller }