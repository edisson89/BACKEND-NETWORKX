/** @format */

const Product = require("../models/Product")

// Crear Producto
exports.createProduct = async (req, res) => {
	try {
		const product = new Product(req.body)
		await product.save()
		res.status(201).json(product)
	} catch (error) {
		res.status(400).json({ message: "Error al crear producto", error: error.message })
	}
}

// Obtener todos los productos
exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find()
		res.json(products)
	} catch (error) {
		res.status(500).json({ message: "Error al obtener productos" })
	}
}

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if (!product) return res.status(404).json({ message: "Producto no encontrado" })
		res.json(product)
	} catch (error) {
		res.status(500).json({ message: "Error al obtener el producto" })
	}
}

// Actualizar Producto
exports.updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!product) return res.status(404).json({ message: "Producto no encontrado" })
		res.json(product)
	} catch (error) {
		res.status(400).json({ message: "Error al actualizar producto", error: error.message })
	}
}

// Eliminar Producto
exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id)
		if (!product) return res.status(404).json({ message: "Producto no encontrado" })
		res.json({ message: "Producto eliminado correctamente" })
	} catch (error) {
		res.status(500).json({ message: "Error al eliminar producto" })
	}
}
