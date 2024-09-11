exports.upload = (req, res) => {
  const file = req.file.filename;
  if (file) {
    res.json({ success: true, message: "Image Upload Success !", url: file });
  } else {
    res.json({ success: false, message: "Somthing went wrong !" });
  }
};
