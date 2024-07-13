const express = require("express");
const multer = require("multer");
const { uploadCustomS3 } = require("..");
const router = express.Router();
const categoriesController = require("../controllers/animalsCategories");
const isAuth = require("../middlewares/isAuth");
const { resolver } = require("../utils/errorHandler");

const upload = multer().any();

// Category Routes
router.post("/add", isAuth, resolver(categoriesController.addCategory));
router.delete("/delete", isAuth, resolver(categoriesController.deleteCategory));
router.get("/:userId", resolver(categoriesController.getCategories));

// Animal Routes within a Category
router.post("/animals/add", isAuth, resolver(categoriesController.addAnimal));
router.delete("/animals/delete", isAuth, resolver(categoriesController.deleteAnimal));
router.put("/animals/update", isAuth, resolver(categoriesController.updateAnimal));

// 
router.get("/:userId/:categoryId/animals", resolver(categoriesController.getAnimals));
router.put("/:userId/:categoryId/:animalId", resolver(categoriesController.updateAnimal));
router.delete("/:userId/:categoryId/:animalId", resolver(categoriesController.deleteAnimal));

module.exports = router;
