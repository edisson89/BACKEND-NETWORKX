/** @format */

const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/auth")

// @route POST /api/auth/register
router.post("/register", authController.register)

// @route POST /api/auth/login
router.post("/login", authController.login)

// @route GET /api/auth/profile (Protegida)
router.get("/profile", authMiddleware, authController.getProfile)

// @route PUT /api/auth/update (Protegida)
router.put("/update", authMiddleware, authController.updateUser)

// @route DELETE /api/auth/delete (Protegida)
router.delete("/delete", authMiddleware, authController.deleteUser)

module.exports = router
