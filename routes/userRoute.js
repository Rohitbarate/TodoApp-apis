const express = require('express');
const {
registerUser,
loginUser,
logoutUser,
getLoggedinUserDetails
} = require('../controllers/userController')
const {isLoggedIn} = require('../middlewares/userMiddleware')



const router = express.Router();

// routes
router.route('/user/register').post(registerUser)
// Router.route('/user/login').post(loginUser)
// Router.route('/user/logout').get(logoutUser)
// Router.route("/userdashboard").get(isLoggedIn, getLoggedinUserDetails);
// Router.route("/user/forgotpassword").post(forgotPassword);
// Router.route("/user/password/reset/:token").post(resetPassword);
// Router.route("/user/update/:id").put(isLoggedIn, updateSingleUser);
// Router.route("/user/delete/:id").delete(isLoggedIn, deleteSingleUser);
// Router.route("/user/:id").get(isLoggedIn, getSingleUser);

module.exports = router;