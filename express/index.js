const express = require("express")

const app = express();

app.get("/",(req,res) => {
    res.end("Home Page")
})

app.get("/about",(req,res) => {
    if(req.query.name === undefined){
        res.end("hello")
    }else res.end(`Hello ${req.query.name}`)
})

app.listen(8000, () => console.log("Server Stated"));