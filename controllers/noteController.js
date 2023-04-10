const Promise = require("../middlewares/promise");
const Note = require("../models/note");

// route(1) : create new note *--user login required--*
exports.createNote = Promise(async (req, res, next) => {
  const { title, description, label } = req.body;
  try {
    let note = await Note.create({
      userId: req.user.id,
      title,
      description,
      label,
    });
    return res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).send("internal server error :", error);
  }
});

// route(2) : get all notes of that user *--user login required--*
exports.getNotes = Promise(async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    if (notes.length === 0) {
      return res.send("you don't have notes...!");
    }
    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    return res.status(500).send("internal server error :", error);
  }
});

// route(3) : edit the existing note *--user login required--*
exports.updateNote = Promise(async (req, res, next) => {
  const noteId = req.params.id;
  const updatedNote = {
    title: req.body?.title,
    description: req.body?.description,
    label: req.body?.label,
    deadLine: req.body?.deadLine,
  };
  try {
    let note = await Note.findByIdAndUpdate(noteId, {
      updatedNote,
    }).then(() => {
      return res.status(200).json({ success: true, note });
    });
  } catch (error) {
    return res.send("internal server error :", error.message);
  }
});
