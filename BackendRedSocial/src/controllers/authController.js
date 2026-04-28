/** @format */

const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Registro de Usuarios
exports.register = async (req, res) => {
	try {
		const { username, email, password } = req.body

		if (!username || !email || !password) {
			return res.status(400).json({ message: "Todos los campos son obligatorios" })
		}

		// Verificar si el email o el nombre de usuario ya existen
		let user = await User.findOne({ $or: [{ email }, { username }] })
		if (user) {
			return res.status(400).json({ message: "El nombre de usuario o el correo ya están registrados" })
		}

		// Crear nuevo usuario (la encriptación ocurre en el modelo)
		user = new User({ username, email, password })
		await user.save()

		// Crear token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

		res.status(201).json({ token, user: { id: user._id, username: user.username } })
	} catch (error) {
		console.error("Error al registrar usuario:", error) // Esto mostrará el error completo en tu consola
		res.status(500).json({ message: "Error al registrar usuario", details: error.message }) // Esto enviará el mensaje del error al cliente
	}
}

// Inicio de Sesión
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({ message: "El email y la contraseña son requeridos" })
		}

		// 1. ¿Existe el usuario?
		const user = await User.findOne({ email })
		if (!user) return res.status(401).json({ message: "Credenciales inválidas" })

		// 2. ¿La contraseña es correcta?
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) return res.status(401).json({ message: "Credenciales inválidas" })

		// 3. Crear el Token JWT
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

		res.json({ token, user: { id: user._id, username: user.username } })
	} catch (error) {
		res.status(500).json({ message: "Error en el servidor" })
	}
}

// Obtener perfil (Ruta protegida)
exports.getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password")
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: "Error al obtener el perfil" })
	}
}

// Actualizar usuario (Ruta protegida)
exports.updateUser = async (req, res) => {
	try {
		const { username, email } = req.body

		// Buscamos y actualizamos usando el ID que viene del token (req.user.id)
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{ username, email },
			{ new: true, runValidators: true }, // new: true devuelve el documento actualizado
		).select("-password")

		if (!updatedUser) {
			return res.status(404).json({ message: "Usuario no encontrado" })
		}

		res.json({
			message: "Usuario actualizado correctamente",
			user: updatedUser,
		})
	} catch (error) {
		res.status(500).json({ message: "Error al actualizar el usuario", details: error.message })
	}
}

// Eliminar usuario (Ruta protegida)
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.user.id)
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" })
		}
		res.json({ message: "Usuario eliminado correctamente" })
	} catch (error) {
		res.status(500).json({ message: "Error al eliminar el usuario" })
	}
}
