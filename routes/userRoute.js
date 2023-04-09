const express = require('express');
const {
registerUser,
loginUser,
logoutUser,
getLoggedinUserDetails
} = require('../controllers/userController')
const {isLoggedIn, isLoggedin} = require('../middlewares/userMiddleware')



const router = express.Router();

// routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(isLoggedin ,logoutUser)
// router.route("/userdashboard").get(isLoggedIn, getLoggedinUserDetails);
// router.route("/user/forgotpassword").post(forgotPassword);
// router.route("/user/password/reset/:token").post(resetPassword);
// router.route("/user/update/:id").put(isLoggedIn, updateSingleUser);
// router.route("/user/delete/:id").delete(isLoggedIn, deleteSingleUser);
// router.route("/user/:id").get(isLoggedIn, getSingleUser);

module.exports = router;