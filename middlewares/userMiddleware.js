const jwt = require("jsonwebtoken");
const promise = require("./promise");
const User = require("../models/user");

exports.isLoggedin = promise(async (req, res, next) => {
  const token = req.header("Auth-token");
  if (!token) {
    return res.status(401).send("login first to access features..!");
  }
  console.log(JSON.stringify(token));
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: data.id });
    // req.user = data.id.user;
    console.log(user);
    next();
  } catch (error) {
    res.status(500).send({ error: "internal server error", error });
  }
});
