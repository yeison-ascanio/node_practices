const express = require("express")
const sqlite3 = require("sqlite3")
const sequelize = require("sequelize")
const methodOverride = require("method-override")
const session = require("express-session")
const findUserMiddleware = require("./middlewares/find_user")
const authUser = require("./middlewares/auth_user")

const app = express()

//routes
const tasksRoutes = require("./routes/task_routes")
const registrationsRoutes = require("./routes/registrations_routes")
const sessionsRoutes = require("./routes/sessions_routes")

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.set("view engine", "pug")
app.use(session({
    secret:["dasdj2312hbhdasbjh", "knkdnjk3jqjkenqj2"],
    saveUninitialized: false,
    resave: false
}))

//middlewares
app.use(findUserMiddleware)
app.use(authUser)

//router
app.use(tasksRoutes)
app.use(registrationsRoutes)
app.use(sessionsRoutes)

app.get("/", function(req, res){
    res.render("home", {user:req.user})
})
app.listen(3000)