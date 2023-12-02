const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "user Not-Found" });
    return res.json(user);
  })
  .patch((req, res) => {
    const body = req.body;
    const id = Number(req.params.id);
    const popId = users.findIndex((user) => user.id === id);
    if (popId != -1) {
      users[popId] = { ...users[popId], ...body };
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return console.log("success");
      });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const popId = users.findIndex((user) => user.id === id);
    console.log(popId);
    if (popId !== -1) {
      users.splice(popId, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, req) => {
        return console.log("success");
      });
    }
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.status(201).json({ status: "success" });
    });
  }
});

app.listen(port, () => console.log("server started"));
