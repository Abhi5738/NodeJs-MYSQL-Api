const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "All field require !" });
  }

  models.User.findOne({ where: { email: email } })
    .then((result) => {
      if (result) {
        return res.status(400).json({
          success: false,
          message: "User Already Exists!",
          data: result,
        });
      }

      bcrypt.genSalt(10, function (error, salt) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Error generating salt",
            error: error,
          });
        }

        bcrypt.hash(password, salt, function (error, hash) {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "Error hashing password",
              error: error,
            });
          }

          const user = {
            name,
            email,
            password: hash,
          };

          models.User.create(user)
            .then((result) => {
              return res.status(200).json({
                success: true,
                message: "Signup Success!",
                data: result,
              });
            })
            .catch((error) => {
              return res.status(400).json({
                success: false,
                message: "Signup Error!",
                error: error,
              });
            });
        });
      });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Database Error !", error: error });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All field require !" });
  }

  models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.json({ success: false, message: "User Does Not Exist !" });
      } else {
        bcrypt.compare(password, user.password, function (error, result) {
          if (error) {
            return res.json({
              success: false,
              message: "Error in password comparison!",
            });
          }
          if (result) {
            const token = JWT.sign(
              { email: user.email, userId: user.userId },
              "secret",
              function (error, token) {
                res.json({
                  success: true,
                  message: "Welcome back !",
                  token: token,
                });
              }
            );
          } else {
            res.json({ success: false, message: "Incorrect password !" });
          }
        });
      }
    })
    .catch((error) => {
      res.json({ success: false, message: "Login Error !" });
    });
};
