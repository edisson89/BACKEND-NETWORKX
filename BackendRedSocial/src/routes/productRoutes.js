/** @format */

const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const auth = require("../middlewares/auth")

// Rutas públicas
router.get("/", productController.getProducts)
router.get("/:id", productController.getProductById)

// Rutas protegidas
router.post("/", auth, productController.createProduct)
router.put("/:id", auth, productController.updateProduct)
router.delete("/:id", auth, productController.deleteProduct)

module.exports = router
