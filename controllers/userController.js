const Promise = require("../middlewares/promise");
const CustomAlert = require("../utils/customAlert");
const User = require("../models/user");

// route(1) for register new user
exports.registerUser = Promise(async (req, res, next) => {
  const { name, email, mobileNo } = req.body;

  if (!(email && name && mobileNo)) {
    //    return next(new CustomAlert("All fiels are mandatory to fill!", 401));
    return res.status(401).json({
      message: {
        type: "warning",
        msg: "All fiels are mandatory to fill....!",
      },
    });
  }

  try {
    //  check is user already present
    let user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      user = await User.create({
        name,
        email,
        password: req.body?.password,
        mobileNo,
        photo: req.body?.photo,
        provider: req.body?.provider,
      });
      const token = await user.getJwtToken();
      return res.status(201).json({
        message: {
          type: "success",
          msg: "sign in successfully. please login with same email..!",
        },
        user,
        newUser: true,
        token,
      });
    }
    return res.status(401).json({
      message: {
        type: "warning",
        msg: "user with this email is already available...!",
      },
      newUser: false,
    });
    // return next(
    //   new CustomAlert("user with this email is already available!", 401)
    // );
  } catch (error) {
    console.log("error : ", error);
    // return next(new CustomAlert("User can not be created", 401));
    return res.status(401).json({
      message: {
        type: "warning",
        msg: "server problem...! User can not be created....! try Again",
      },
    });
  }
});

// route(2) for login existing user
exports.loginUser = Promise(async (req, res, next) => {
  const { email, password } = req.body;

  // check all fields shouldn't be empty
  if (!(email && password)) {
    //    return next(new CustomAlert("All fiels are mandatory to fill!", 401));
    return res.status(401).json({
      message: {
        type: "warning",
        msg: "All fiels are mandatory to fill....!",
      },
    });
  }
  try {
    let options = {
      path: "/*",
      // domain: ".localhost",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    };

    let user = await User.findOne({ email: email }).select("+password");
    // check is user present with provided email
    if (!user) {
      //    return next(new CustomAlert("Account not found with this email...!", 401));
      return res.status(401).json({
        message: {
          type: "danger",
          msg: "Account not found with this email....!",
        },
      });
    }
    // check the password is correct or not
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      //    return next(new CustomAlert("Password is not valid,Check it once...!", 401));
      return res.status(401).json({
        message: {
          type: "warning",
          msg: "Password is invalid,Check it once....!",
        },
      });
    }
    const token = await user.getJwtToken();
    res
      .cookie("token", token, options)
      .header({
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Auth-token": token,
      })
      .status(201)
      .json({
        message: {
          type: "success",
          msg: "login successfully....!",
        },
        token,
      });
  } catch (error) {
    console.log("error : ", error);
    // return next(new CustomAlert("User can not be created", 401));
    return res.status(401).json({
      message: {
        type: "danger",
        msg: "login failed....!",
      },
    });
  }
});

// route(3) for log-out the user
exports.logoutUser = Promise(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.send({ message: "login first...!" });
  }
  const tokens = await user.deleteToken(req.cookie.token);
  res.clearCookie("token").status(200).json({
    success: true,
    message: "sign out successfully...!",
    tokens,
  });
});

// route(4) get logged user details
exports.getLoggedUser = Promise(async (req, res) => {
  let user = req.user;
  if (!user) {
    res
      .status(404)
      .send({ message: { type: "danger", msg: "login first...!" } });
  }
  const dbUser = await User.findById(user.id).select("-password");
  if (!dbUser) {
    res.status(404).send({
      message: { type: "danger", msg: "user not found , login first...!" },
    });
  }
  res.status(200).json({
    message: { type: "success", msg: "successfully get details...!" },
    user: dbUser,
  });
});
