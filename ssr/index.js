const express = require("express");

const path = require("path")
const urlRoute = require("./routes/url");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");

const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended : false}))
app.use(express.json());

connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then( ()=> console.log("mongoDb started"));

app.use("/url", urlRoute);
app.use("/", staticRoute);



app.get("/url/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
                visitHistory: {
                timestamp: Date.now(),
            },
        }
    });
    res.redirect(entry.redirectURL)
})

app.get("/test",async (req,res)=>{
    const allURLs = await URL.find({});
    return res.render("home", {
        urls: allURLs,
    });
});



app.listen(port, () => {console.log(`server started at ${port}`)});