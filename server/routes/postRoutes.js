const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/myPosts", authController.protect, postController.getAllMyPosts);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
