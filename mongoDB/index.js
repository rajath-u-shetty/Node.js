const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const port = 3000;

//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
}, 
  { timestamps: true }
);

mongoose
  .connect("mongodb://127.0.0.1:27017/practice-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error",err));

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({})
  const html = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
        </ul>
    `;
  return res.send(html);
});

app.get("/api/users",async (req, res) => {
  const allDbUsers = await User.find({})
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "user Not-Found" });
    return res.json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "shetty"})
    return res.status(200).json({ msg: "success"})
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({ msg: "success"})
  });

app.post("/api/users",async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ){
    return res.status(400).json({ msg: "All fields are required.."})
  }
  
  const result = await User.create({
  firstName: body.first_name,
  lastName: body.last_name,
  email: body.email,
  gender: body.gender,
  jobTitle: body.job_title,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "success"});

});

app.listen(port, () => console.log("server started"));
