const express = require(`express`);
const dataRouter = require("./data");

const mainApiRoute = express.Router();

mainApiRoute.use("/data", dataRouter);


module.exports = mainApiRoute;
