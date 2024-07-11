const express = require("express");
const router = express.Router();
const toDoController = require("../controllers/toDoList");
const isAuth = require("../middlewares/isAuth");

// To-Do List Routes
router.post("/add", toDoController.addToDo);
router.get("/:userId", toDoController.getToDoList);
router.put("/:userId/:toDoId", toDoController.updateToDo);
router.patch("/", isAuth, toDoController.updateToDo);
router.delete("/", toDoController.deleteToDo);

module.exports = router;
