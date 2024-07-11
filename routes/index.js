const express = require(`express`);
const dataRouter = require("./data");
const authRouter = require("./auth");
const toDoListRouter = require("./toDoList");
const financeRouter = require("./finance");
const animalsCategoriesRouter = require("./animalsCategories");


// collarRouter

const mainApiRoute = express.Router();

mainApiRoute.use("/data", dataRouter);
mainApiRoute.use("/auth", authRouter);
mainApiRoute.use(`/todo`, toDoListRouter);
mainApiRoute.use(`/finance`, financeRouter);
mainApiRoute.use(`/collar`, collarRouter);
// mainApiRoute.use(`animals`, animalsCategoriesRouter);
mainApiRoute.use(`/categories`, animalsCategoriesRouter);
//
module.exports = mainApiRoute;
