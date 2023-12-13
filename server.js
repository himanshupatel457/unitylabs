const app = require('./app');
const dbConnect = require('./database/database');



dbConnect();


app.listen(process.env.PORT,(req,res,next)=>{
    console.log(`server is working on PORT = ${process.env.PORT}`);
})