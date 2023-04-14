const express = require("express");
const { createNote ,getNotes,updateNote,deleteNote} = require("../controllers/noteController");
const { isLoggedin } = require("../middlewares/userMiddleware");



const router = express.Router();


router.route('/getnotes').get(isLoggedin,getNotes);
router.route('/create').put(isLoggedin,createNote);
router.route('/update/:id').put(isLoggedin,updateNote);
router.route('/delete/:id').put(isLoggedin,deleteNote);



module.exports = router