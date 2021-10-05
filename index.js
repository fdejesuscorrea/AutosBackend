const express = require("express");
const server = express();
const cors = require("cors");
const {PORT, CWD} = require("./config");
const {SignRouter,CarsRouter,CarUpRouter} =require("./routes");
require("./data/db");
server.use("/upload",express.static(CWD+"/upload"));
server.use(cors());
server.use(express.json());
server.use("/api",SignRouter);
server.use("/api",CarsRouter);
server.use("/api",CarUpRouter);
server.listen(PORT,"0.0.0.0",()=>{
    console.log(`application running on port ${PORT}`);
});