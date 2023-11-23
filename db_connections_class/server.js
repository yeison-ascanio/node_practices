import express from "express"
import sqlite3 from "sqlite3"

let db = new sqlite3.Database("project_backend")
const app = express()
app.use(express.urlencoded({ extended : true }))

app.post("/pendientes", function(req, res){
    console.log(req.body.description);
    db.run(`INSERT INTO task(description) VALUES (?)`, req.body.description)
    res.send("inserción exitosa.")
})



app.listen(3000)
process.on("SIGINT", function(){
    console.log("server cerrado");
    db.close()
    process.exit()
})