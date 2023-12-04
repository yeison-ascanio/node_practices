const express = require("express")
const sqlite3 = require("sqlite3")
const sequelize = require("sequelize")
const tasks = require("./controllers/tasks.js")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "pug")

app.post("/pendientes", function (req, res) {
    console.log(req.body.description);
    res.send("inserción exitosa.")
})

app.get("/tasks", tasks.home)


app.listen(3000)