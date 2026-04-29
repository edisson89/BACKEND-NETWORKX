/** @format */

const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "El nombre del producto es obligatorio"],
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "El precio es obligatorio"],
		},
		provider: {
			type: String,
			required: [true, "El proveedor es obligatorio"],
		},
		location: {
			type: String,
			required: [true, "La ubicación es obligatoria"],
		},
		badges: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model("Product", ProductSchema)
