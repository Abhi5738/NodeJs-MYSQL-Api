const models = require("../models");

exports.addComment = async (req, res) => {
  const { userId, postId, content } = req.body;
  const comment = {
    userId,
    postId,
    content,
  };

  const existUser = await models.User.findByPk(userId);
  const existPost = await models.Post.findByPk(postId);

  if (!existUser) {
    res.json({ success: false, message: "User is not found !" });
    return;
  }

  if (!existPost) {
    res.json({ success: false, message: "Post is not valid !" });
    return;
  }

  models.Comment.create(comment)
    .then((result) => {
      res.json({
        success: true,
        message: "Comment added success !",
        comment: comment,
      });
    })
    .catch((err) => {
      res.json({ success: false, message: "Commet error occured !" });
    });
};

exports.getOneComment = (req, res) => {
  const id = req.params.id;

  models.Comment.findByPk(id)
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ success: true, message: "Success !", data: result });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Comment Not Found !" });
      }
    })
    .catch((error) => {
      res
        .status(400)
        .json({ success: false, message: "Some error occure !", error: error });
    });
};

exports.getAllComment = (req, res) => {
  models.Comment.findAll()
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

exports.updateComment = async (req, res) => {
  const { content, postId, userId } = req.body;
  const { id } = req.params;

  const updateComment = {
    content,
    postId,
    userId,
  };

  const existUser = await models.User.findByPk(userId);
  const existPost = await models.Post.findByPk(postId);
  const existComment = await models.Comment.findByPk(id);

  if (!existComment) {
    res.json({ success: false, message: "commnet not found !" });
    return;
  }

  if (!existUser) {
    res.json({ success: false, message: "User is not found !" });
    return;
  }

  if (!existPost) {
    res.json({ success: false, message: "Post is not valid !" });
    return;
  }

  models.Comment.update(updateComment, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Comment Update Successfull !",
        data: updateComment,
      });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ success: false, message: "Comment Update error !" });
    });
};

exports.deleteOneComment = (req, res) => {
  const id = req.params.id;
  models.Comment.destroy({ where: { id: id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: "Comment Delete successfull !",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Comment Not Found !",
        });
      }
    })
    .catch((error) => {
      res
        .status(400)
        .json({
          success: false,
          message: "Comment delete error !",
          error: error,
        });
    });
};
