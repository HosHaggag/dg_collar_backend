const User = require("../models/User");

// Create a new to-do item

// Create a new to-do item
exports.addToDo = async (req, res) => {
  try {
    const { userId, task } = req.body;
    const user = await User.findById(userId);
    console.log(req.body, { user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newToDo = {
      task,
      isCompleted: false,
    };

    user.toDoList.push(newToDo);
    await user.save();

    res.status(201).json({ message: "To-do item added", toDoList: user.toDoList });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all to-do items for a user
exports.getToDoList = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ toDoList: user.toDoList });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a to-do item

// Update a to-do item
exports.updateToDo = async (req, res) => {
  try {
    const { taskId, isCompleted, task } = req.body;

    console.log(req.body);
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const toDoItem = user.toDoList.id(taskId);

    if (!toDoItem) {
      return res.status(404).json({ message: "To-do item not found" });
    }

    toDoItem.task = task || toDoItem.task;
    toDoItem.isCompleted = isCompleted !== undefined ? isCompleted : toDoItem.isCompleted;

    await user.save();

    res.status(200).json({ message: "To-do item updated", toDoList: user.toDoList });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Delete a to-do item
exports.deleteToDo = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    console.log({ userId, taskId });
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const toDoItem = user.toDoList.id(taskId);

    if (!toDoItem) {
      return res.status(404).json({ message: "To-do item not found" });
    }

    // Remove the to-do item using pull
    user.toDoList.pull(taskId);
    await user.save();

    res.status(200).json({ message: "To-do item deleted", toDoList: user.toDoList });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Server error", error });
  }
};
