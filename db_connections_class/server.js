const express = require("express")
const sqlite3 = require("sqlite3")
const sequelize = require("sequelize")
const methodOverride = require("method-override")
const session = require("express-session")
const findUserMiddleware = require("./middlewares/find_user")
const authUser = require("./middlewares/auth_user")
const socketio = require("socket.io")

const app = express()

//routes
const tasksRoutes = require("./routes/task_routes")
const registrationsRoutes = require("./routes/registrations_routes")
const sessionsRoutes = require("./routes/sessions_routes")
const categoriesRoutes = require("./routes/categories_routes")

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.set("view engine", "pug")
app.use(session({
    secret: ["dasdj2312hbhdasbjh", "knkdnjk3jqjkenqj2"],
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
app.use(categoriesRoutes)

app.get("/", function (req, res) {
    res.render("home", { user: req.user })
})
let server = app.listen(3000)
let io = socketio(server)
let sockets = {}
let usersCount = 0

io.on("connection", function (socket) {

    let userId = socket.request._query.loggeduser
    if(userId) sockets[userId] = socket;
    console.log(sockets);

    //real time connection
    usersCount++
    io.emit("count_updated", { count: usersCount })
    socket.on("new_task", function(data){
        if(data.userId){
            let userSocket = sockets[data.userId]
            if(!userSocket) return

            userSocket.emit("new_task", data)
        }
        io.emit("new_task", data)
    })
    socket.on("disconnect", function () {
        Object.keys(sockets).forEach(userId=>{
            let con = sockets[userId]
            if(con.id == socket.id) sockets[userId] = null
        })
        console.log(sockets);
        usersCount--
        io.emit("count_updated", { count: usersCount })
    })
})

const client = require("./realTime/client")
const { log } = require("console")
