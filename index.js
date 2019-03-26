// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!


// Import const varibale  into the file
require('dotenv').config();

// Import libary

const server=require("./data/server.js");



 // Ports
const PORT= process.env.PORT || 7000;



server.listen (PORT,()=>{

}) 