const express = require("express");
const authController = require("../controllers/auth");
const adminAuthController = require("../controllers/adminAuth");
const { resolver } = require("../utils/errorHandler");

const authRouter = express.Router();

authRouter.post("/login", resolver(authController.login));
authRouter.post("/register", resolver(authController.signUp));
authRouter.post("/check-auth", resolver(authController.checkAuth));

//
authRouter.post("/admin/login", resolver(adminAuthController.login));
authRouter.post("/admin/signup", resolver(adminAuthController.signUp));

module.exports = authRouter;
