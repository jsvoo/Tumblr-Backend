const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const api_route = require("./routes/api_route")
const cors = require('cors')

app.use(cors({origin:"*"}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.use("/", api_route)

mongoose.connect("mongodb://localhost/Tumblr_db", { useNewUrlParser: true, useUnifiedTopology: true }, 
err => { 
    if (err) throw err 
    console.log("Database connected")
})

mongoose.Promise=global.Promise

app.listen(4000, ()=>{
    console.log("Running on http://localhost:4000")
})