const User = require("../models/User");
const formidable = require("formidable");
const { uploadFileToS3 } = require(`./../utils/s3/uploadFileToS3`);
const { uploadMultiple } = require("../utils/multer");
const { uploadMultipleS3 } = require("../utils/multer/s3");
// Add a new category
exports.addCategory = async (req, res) => {
  const { name } = req.body;
  let { user } = req;
  user.categories.push({ name, animals: [] });
  await user.save();
  res.status(201).json({ message: "Category added", categories: user.categories });
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    // console.log({ userId, taskId });
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const category = user.categories.id(categoryId);
    if (!category) {
      return res.status(404).json({ message: "To-do item not found" });
    }

    // Remove the to-do item using pull
    user.categories.pull(categoryId);
    await user.save();

    res.status(200).json({ message: "To-do item deleted", categories: user.categories });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all categories for a user
exports.getCategories = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ categories: user.categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ____________________________________________________________________________________________________________

// Add an animal to a category
exports.addAnimal = async (req, res) => {
  // const form = new formidable.IncomingForm();

  await uploadMultipleS3(req, res);

  console.log(req.body);

  const { name, category, birth_date, healthStatus, collarId, categoryId } = req.body;
  const user = req.user;

  const categoryItem = user.categories.id(categoryId);

  if (!categoryItem) {
    return res.status(404).json({ message: "Category not found" });
  }

  const newAnimal = {
    name,
    category,
    birth_date,
    healthStatus,
    gallery: req.files.map((e) => e?.key),
  };

  if (collarId) {
    const collar = user.collars.id(collarId);
    if (!collar) {
      throw new Error("Wrong Collar Id");
    }

    newAnimal.collarId = collarId;
  }

  categoryItem.animals.push(newAnimal);
  await user.save();

  res.status(201).json({ message: "Animal added", categories: user.categories });
};

// Get all animals in a category
exports.getAnimals = async (req, res) => {
  try {
    const { userId, categoryId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const categoryItem = user.categories.id(categoryId);

    if (!categoryItem) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ animals: categoryItem.animals });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update an animal in a category
exports.updateAnimal = async (req, res) => {
  try {
    const { userId, categoryId, animalId } = req.params;
    const { name, category, age, healthStatus, collarId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const categoryItem = user.categories.id(categoryId);

    if (!categoryItem) {
      return res.status(404).json({ message: "Category not found" });
    }

    const animalItem = categoryItem.animals.id(animalId);

    if (!animalItem) {
      return res.status(404).json({ message: "Animal not found" });
    }

    animalItem.name = name || animalItem.name;
    animalItem.category = category || animalItem.category;
    animalItem.age = age !== undefined ? age : animalItem.age;
    animalItem.healthStatus = healthStatus || animalItem.healthStatus;
    animalItem.collarId = collarId || animalItem.collarId;
    categoryItem.lastSync = new Date();

    await user.save();

    res.status(200).json({ message: "Animal updated", categories: user.categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an animal from a category
exports.deleteAnimal = async (req, res) => {
  try {
    const { userId, categoryId, animalId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const categoryItem = user.categories.id(categoryId);

    if (!categoryItem) {
      return res.status(404).json({ message: "Category not found" });
    }

    const animalItem = categoryItem.animals.id(animalId);

    if (!animalItem) {
      return res.status(404).json({ message: "Animal not found" });
    }

    animalItem.remove();
    categoryItem.lastSync = new Date();

    await user.save();

    res.status(200).json({ message: "Animal deleted", categories: user.categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
