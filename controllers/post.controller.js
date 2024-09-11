const models = require("../models");

exports.addPosts = async (req, res) => {
  const { title, content, imageUrl, categoryId, userId } = req.body;
  const post = {
    title,
    content,
    imageUrl,
    categoryId,
    userId,
  };

  models.Category.findByPk(categoryId).then((result) => {
    if (result !== null) {
      models.Post.create(post)
        .then((result) => {
          res.status(200).json({
            success: true,
            message: "Post created successfully",
            post: result,
          });
        })
        .catch((error) => {
          res.status(400).json({
            success: false,
            message: "Post Created Error occure",
            error: error,
          });
        });
    } else {
      res.json({
        success: true,
        message: " Invalid CategoryId",
      });
    }
  });
};

exports.getOnePost = (req, res) => {
  const id = req.params.id;
  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ success: true, message: "Success !", data: result });
      } else {
        res.status(400).json({ success: false, message: "Post Not Found !" });
      }
    })
    .catch((error) => {
      res
        .status(400)
        .json({ success: false, message: "Some error occure !", error: error });
    });
};

exports.getAllPost = (req, res) => {
  models.Post.findAll()
    .then((result) => {
      res
        .status(200)
        .json({ success: true, message: "Success !", data: result });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ success: false, message: "Some error occure !", error: error });
    });
};

exports.updatePost = (req, res) => {
  const { title, content, imageUrl, categoryId } = req.body;
  const id = req.params.id;
  const updatePost = {
    title,
    content,
    imageUrl,
    categoryId,
  };

  models.Category.findByPk(categoryId).then((result) => {
    if (result !== null) {
      models.Post.update(updatePost, { where: { id: id } })
        .then((result) => {
          res.status(200).json({
            success: true,
            message: "Post Update Successfull !",
            data: updatePost,
          });
        })
        .catch((error) => {
          res
            .status(400)
            .json({ success: false, message: "Post Update error !" });
        });
    } else {
      res.json({
        success: true,
        message: " Invalid CategoryId",
      });
    }
  });
};

exports.deleteOnePost = (req, res) => {
  const id = req.params.id;
  models.Post.destroy({ where: { id: id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: "Post Delete successfull !",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Post Not Found !",
        });
      }
    })
    .catch((error) => {
      res
        .status(400)
        .json({ success: false, message: "Post delete error !", error: error });
    });
};
