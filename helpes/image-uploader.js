// ********** HERE WE CAN UPLOAD ANY TYPE IMAGE ***************

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().getTime() + path.extname(file.originalname));
//   },
// });

// exports.upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 10,
//   },
// });

// ** HERE WE CAN UPLOAD ONLY TWO TYPE OF IMAGE ONE OF JPEG AND SECOND OF PNG **

const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported files"), false);
  }
};

// Exporting multer configuration
exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB file size limit
  },
  fileFilter: fileFilter,
});
