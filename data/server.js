// Modules

const express = require("express");
const server = express();
const ProjeectRouter = require ("./ProjectsRouter.js");
const ActionRouter=require ("./Actionrouter.js")

server.use(express.json());

const cors = require("cors");

server.use(cors
());


server.use("/api/projects")
server.use("/api/actions",ActionRouter)

sever.get ('/', (req, res) => {

});

// export
 moudle.exports = server