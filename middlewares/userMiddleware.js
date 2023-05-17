const jwt = require("jsonwebtoken");
const promise = require("./promise");
const User = require("../models/user");

exports.isLoggedin = promise(async (req, res, next) => {
  const token = req.header("Auth-token");
  if (!token) {
    return res.status(401).send("login first to access features..!");
  }
  // console.log(JSON.stringify(token));
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: data.id });
    req.user = user;
    // console.log("middleware : ",req.user);
    next();
  } catch (error) {
    res.status(500).send({ error: "internal server error", error });
  }
});

exports.findUser = promise(async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: {
          type: "danger",
          msg: "Account not found with this email....!",
        },
        newUser: true,
      });
    }
    return res.status(401).json({
      message: {
        type: "success",
        msg: "user with this email is present...!",
      },
      user,
      newUser: false,
    });
  } catch (error) {
    res.status(500).send({ error: "internal server error", error });
  }
});
