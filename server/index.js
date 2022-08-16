const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password:"",
    database: "snake",
});
//middleweare
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({extend: true}))


app.post("/api/bejelentkezes",(req,res) =>{
    const username = req.body.username 
    const password = req.body.password
    const sqlSelect = "SELECT * FROM users WHERE username = ? AND password = ? ";
   db.query(sqlSelect,[username,password],(err, result) => {
       if(err){
           res.send({err: err});
       }
       if(result.length > 0){
       res.send(result)
       }else{
           res.send({message: "wrond username or password"});
       }
    });
});

app.get("/api/getMaps",(req,res) =>{
    const sqlSelect = "SELECT * FROM maps";
   db.query(sqlSelect,(err, result) => {
       res.send(result)
    });
});
app.get("/api/loadSavedMap",(req,res) =>{
    const sqlSelect = "SELECT * FROM maps ORDER BY id DESC LIMIT 1";
   db.query(sqlSelect,(err, result) => {
       res.send(result)
    });
});
app.get("/api/loadMap/:id",(req,res) =>{
    const id = req.params.id
    const sqlSelect = "SELECT * FROM maps WHERE id = ?";
   db.query(sqlSelect,[id],(err, result) => {
       res.send(result)
    });
});

app.get("/api/getOwnMaps/:username",(req,res) =>{
    const username = req.params.username
    const sqlSelect = "SELECT * FROM maps WHERE uploaded_by = ?";
   db.query(sqlSelect,[username],(err, result) => {
       res.send(result)
    });
});
app.post("/api/insert",(req,res) =>{
    const username = req.body.username
    const email = req.body.email 
    const password = req.body.password

    const sqlInsert = "INSERT INTO users (username, email, password) VALUES(?,?,?);"
    db.query(sqlInsert,[username,email,password],(err, result) => {
    }); 
    
});
app.post("/api/insertMap",(req,res) =>{
    const name = req.body.name
    const width = req.body.width
    const height = req.body.height
    const parts = req.body.parts
    const stones = req.body.stones
    const rightS = req.body.right
    const bottom = req.body.bottom
    const uploaded_by = req.body.uploaded_by

    const sqlInsert = "INSERT INTO maps (name, width, height, parts, stones, rightS, bottom, uploaded_by) VALUES(?,?,?,?,?,?,?,?);"
    db.query(sqlInsert,[name, width, height, parts, stones, rightS, bottom, uploaded_by],(err, result) => {
       console.log(err)
       console.log(result)
    });
    
});

app.listen(3001, () =>{
    console.log("running on port 3001?")
})