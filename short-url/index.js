const express = require("express");

const urlRoute = require("./routes/url");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url")
const app = express();
const port = 3001;

app.use(express.urlencoded({extended : false}))
app.use(express.json());

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then( ()=> console.log("mongoDb started"));

app.use("/url", urlRoute);

app.get("/:shortId",async (req,res)=>{
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



app.listen(port, () => {console.log(`server started at ${port}`)});