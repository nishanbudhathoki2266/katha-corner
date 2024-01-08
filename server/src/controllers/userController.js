const users = require("./../../configs/users.json");

const getAllUsers = (req, res) => {
  res.send(users);
};

module.exports = getAllUsers;
