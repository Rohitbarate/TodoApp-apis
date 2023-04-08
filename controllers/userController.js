const Promise = require("../middlewares/promise");
const CustomAlert = require("../utils/customAlert");
const User = require("../models/user");

// route(1) for register new user
exports.registerUser = Promise(async (req, res, next) => {
  const { name, email, password, mobileNo } = req.body;

  if (!(email && name && password && mobileNo)) {
    //    return next(new CustomAlert("All fiels are mandatory to fill!", 401));
    return res.status(401).send("All fiels are mandatory to fill....!");
  }

  try {
    //  check is user already present
    let user = await User.findOne({ email: email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password,
        mobileNo,
        photo: req.body?.photo,
      });

      return res.status(201).json({
        success: true,
        user,
      });
    }
    return res
      .status(401)
      .send("user with this email is already available...!");
    // return next(
    //   new CustomAlert("user with this email is already available!", 401)
    // );
   
  } catch (error) {
    console.log("error : ", error);
    // return next(new CustomAlert("User can not be created", 401));
    return res.status(401).send("User can not be created....!");
  }
});