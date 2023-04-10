const express = require("express");
const { createNote ,getNotes,updateNote} = require("../controllers/noteController");
const { isLoggedin } = require("../middlewares/userMiddleware");



const router = express.Router();


router.route('/create').post(isLoggedin,createNote);
router.route('/update').put(isLoggedin,updateNote);
router.route('/delete').delete();
router.route('/getnotes').get(isLoggedin,getNotes);



module.exports = router