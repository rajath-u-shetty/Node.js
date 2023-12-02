const express = require("express");
const newRoute = require("./routes/index");
const { connectMongoDb } = require("./connection");

const app = express();
const port = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/practice-2")

app.use(express.urlencoded({extended: false}));

app.use("/", newRoute);

app.listen(post,() => console.log("sever started at ", port))