const express = require("express");
const app = express();
const port = 3000;

const users = [
  { id: 1, name: "Nishan Budhathoki" },
  { id: 2, name: "Ram Shrestha" },
  { id: 3, name: "Sita Karki" },
];

app.get("/", (req, res) => {
  res.send(users);
});

app.get("users/:id", (req, res) => {
  res.send(users.find((user) => user.id === +req.params.id));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
