/** @format */

require("dotenv").config()
var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")

// Configuración de la conexión a MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Conectado a MongoDB con éxito"))
	.catch((err) => console.error("Error al conectar a MongoDB:", err))

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
const authRoutes = require("./routes/authRoutes")

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

// Configuración de CORS
// app.use(cors()) // Esto permite peticiones desde cualquier origen (útil para desarrollo)

// Configuración más segura para producción (puedes ajustar el origin a la URL de tu frontend)
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
)

// El logger (morgan) se coloca aquí para registrar todas las peticiones entrantes
app.use(logger("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// API Routes
app.use("/api/auth", authRoutes)

// View Routes
app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

module.exports = app
