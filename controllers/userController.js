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
    let user = await User.findOne({ email: email }).select("-password");
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

// route(2) for login existing user
exports.loginUser = Promise(async (req, res, next) => {
  const { email, password } = req.body;

  // check all fields shouldn't be empty
  if (!(email && password)) {
    //    return next(new CustomAlert("All fiels are mandatory to fill!", 401));
    return res.status(401).send("All fiels are mandatory to fill....!");
  }
  try {
    let user = await User.findOne({ email: email }).select("+password");
    // check is user present with provided email
    if (!user) {
      //    return next(new CustomAlert("Account not found with this email...!", 401));
      return res.status(401).send("Account not found with this email....!");
    }
    // check the password is correct or not
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      //    return next(new CustomAlert("Password is not valid,Check it once...!", 401));
      return res.status(401).send("Password is invalid,Check it once....!");
    }
    const token = user.getJwtToken();

    res
      .cookie("token", token, {
        // expires:1000 * process.env.COOKIE_EXP_TIME,
        httpOnly: true,
      })
      .header("Auth-token", token)
      .status(201)
      .json({
        success: true,
        message: "login successfully....!",
        user,
      });
  } catch (error) {
    console.log("error : ", error);
    // return next(new CustomAlert("User can not be created", 401));
    return res.status(401).send("login failed....!");
  }
});

// route(3) for logout the user
exports.logoutUser = Promise(async (req, res, next) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "sign out successfully...!",
  });
});
