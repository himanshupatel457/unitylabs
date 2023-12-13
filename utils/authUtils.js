const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Encrypting Password
const hashThisPassword = async( password )=>{
    try{
        const saltRounds = 14;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }
    catch(err){
        console.log(`Error while Encrypting Password ${err}`);
    }
};




const comparePassword = async (password , hashedPassword) =>{
    try{
        const result = bcrypt.compare(password,hashedPassword);
        return result;
    }
    catch(err){
        console.log(`Some error generated while comparing encrypted pass : ${err}`);
    }
};




// decrypt token to get payload

const getTokenDetails = async (token) => {
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        console.log('Decoded Token:', decoded);
        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        throw error;
    }
};

module.exports = {hashThisPassword,comparePassword,getTokenDetails};