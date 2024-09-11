const express = require("express");
const imageControllers = require("../controllers/image.controller");
const checkAuth = require("../middleware/check-auth");
const imageUploader = require("../helpes/image-uploader");
const router = express.Router();

router.post(
  "/upload",
  checkAuth.checkAuth,
  imageUploader.upload.single("image"),
  imageControllers.upload
);

module.exports = router;
