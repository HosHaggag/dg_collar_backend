const express = require("express");
const router = express.Router();
const collarController = require("../controllers/collarController");
const isAuth = require("../middlewares/isAuth");
const { resolver } = require("../utils/errorHandler");

// Collar Routes
router.post("/add", resolver(collarController.addCollar));
// router.put("/edit", isAuth, resolver(collarController.editCollar));
// router.delete("/delete", isAuth, resolver(collarController.deleteCategory));
router.get("/:collarId", isAuth, resolver(collarController.getCategories));

module.exports = router;
