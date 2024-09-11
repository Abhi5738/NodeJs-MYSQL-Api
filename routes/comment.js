const express = require("express");
const router = express.Router();
const controllers = require("../controllers/comment.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

router.post("/comment", checkAuthMiddleware.checkAuth, controllers.addComment);
router.get(
  "/comment/:id",
  checkAuthMiddleware.checkAuth,
  controllers.getOneComment
);
router.get(
  "/comment",
  checkAuthMiddleware.checkAuth,
  controllers.getAllComment
);
router.put(
  "/comment/:id",
  checkAuthMiddleware.checkAuth,
  controllers.updateComment
);
router.delete(
  "/comment/:id",
  checkAuthMiddleware.checkAuth,
  controllers.deleteOneComment
);

module.exports = router;
