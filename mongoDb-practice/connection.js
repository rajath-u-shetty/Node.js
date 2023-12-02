const mongoose = require("mongoose");

async function connectMongoDb(url) {
  return mongoose.connect(url).then(() => {
    console.log("successfully connected");
  })
}

module.exports = {connectMongoDb}