import express from "express"
import sqlite3 from "sqlite3"
import Sequelize from "sequelize"

// let db = new sqlite3.Database("project_backend") instancia de sqlite que ya no se usara

//instancia del orm y la configuracion para que use como motor sqlite y la ubicacion de la bd
const sequelize = new Sequelize("project_backend", null, null,{
    dialect: "sqlite",
    storage: "./project_backend"
})

const app = express()
app.use(express.urlencoded({ extended : true }))

app.post("/pendientes", function(req, res){
    console.log(req.body.description);
    // db.run(`INSERT INTO task(description) VALUES (?)`, req.body.description) //consulta raw para insercion directa usan slqite
    res.send("inserción exitosa.")
})



app.listen(3000)
// proceso anterior por medio de sqlite donde se manejaba la desconexion
// process.on("SIGINT", function(){
//     console.log("server cerrado");
//     db.close()
//     process.exit()
// })