const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// To-Do List Schema
const ToDoSchema = new Schema({
  task: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  dueDate: Date,
});

// Finance Management Schema
const FinanceSchema = new Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now },
});

// Animal Schema
const AnimalSchema = new Schema({
  name: { type: String, required: true },
  birth_date: Date,
  healthStatus: String,
  collarId: { type: Schema.Types.ObjectId, ref: "Collar" },
  gallery: [String],
});

// Collar Schema
const CollarSchema = new Schema({
  collarId: { type: String, required: true, unique: false },
  animalId: { type: Schema.Types.ObjectId, ref: "Animal" },
  lastSync: Date,
  data: {}, // Stores collar-related data, e.g., location, activity
});

const CategoriesSchema = new Schema({
  name: { type: String, required: true, unique: false },
  // lastSync: Date,
  animals: [AnimalSchema],
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, required: false },
  profileImg: String,
  coverImg: String,
  postal_code: String,
  iban: { type: String, required: false },
  isBlocked: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  toDoList: [ToDoSchema],
  finance: [FinanceSchema],
  categories: [CategoriesSchema], // Stores categories and their animals
  // collars: [CollarSchema],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
