const experss = require("express");
const getAllUsers = require("./../controllers/userController");

const router = experss.Router();

router.get("/", getAllUsers);

module.exports = router;
