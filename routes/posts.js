const express = require("express");
const router = express.Router();
const controllers = require("../controllers/post.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

router.post("/post", checkAuthMiddleware.checkAuth, controllers.addPosts);
router.get("/post", controllers.getAllPost);
router.get("/post/:id", controllers.getOnePost);
router.put("/post/:id", checkAuthMiddleware.checkAuth, controllers.updatePost);
router.delete(
  "/post/:id",
  checkAuthMiddleware.checkAuth,
  controllers.deleteOnePost
);

module.exports = router;
