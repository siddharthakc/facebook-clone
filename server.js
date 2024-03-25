const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
  host:"locahost",
  user:"root",
  password:"",
  database:"meow"
})

app.listen(port,()=>{
  console.log("Server Running")
})