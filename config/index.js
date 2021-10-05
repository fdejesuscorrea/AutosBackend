if(process.env.NODE_ENV!== "production"){
    require("dotenv").config();
}
module.exports={
    PORT:process.env.PORT,
    SECRETKEY:process.env.SECRETKEY,
    ROOT:process.env.ROOT
}