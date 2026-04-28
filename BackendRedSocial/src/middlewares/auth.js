/** @format */

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	// 1. Obtener el token del encabezado (Header)
	const authHeader = req.header("Authorization")

	if (!authHeader) {
		return res.status(401).json({ message: "Acceso denegado. No hay token." })
	}

	// El formato suele ser "Bearer TOKEN", así que separamos el string
	const parts = authHeader.split(" ")

	if (parts.length !== 2 || parts[0] !== "Bearer") {
		return res.status(401).json({ message: "Formato de token incorrecto (Bearer <token>)" })
	}

	const token = parts[1]

	try {
		// 2. Verificar el token
		const verified = jwt.verify(token, process.env.JWT_SECRET)

		// 3. Guardar los datos del usuario en el request para que las rutas los usen
		req.user = verified

		// 4. ¡Todo bien! Pasar a la siguiente función
		next()
	} catch (error) {
		res.status(401).json({ message: "Token no válido o expirado" })
	}
}
