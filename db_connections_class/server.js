const express = require("express")
const sqlite3 = require("sqlite3")
const sequelize = require("sequelize")
const methodOverride = require("method-override")


const app = express()

//routes
const tasksRoutes = require("./routes/task_routes")
const registrationsRoutes = require("./routes/registrations_routes")

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "pug")
app.use(methodOverride("_method"))
app.use(tasksRoutes)
app.use(registrationsRoutes)


app.listen(3000)