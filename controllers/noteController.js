const Promise = require("../middlewares/promise");
const Note = require("../models/note");

// route(1) : create new note *--user login required--*
exports.createNote = Promise(async (req, res, next) => {
  const { title, description, label } = req.body;
  // console.log("id :",req.user.id)
  let userNotes = await Note.findById(req.user.id);
  // console.log("userNotes : ",userNotes)
  let newNote = {
    title: title,
    description: description,
    label: label,
    deadLine: req.body?.deadLine,
  };
  if (!userNotes) {
    const insertNote = await Note.create({
      _id: req.user.id,
      notes: [{ note: newNote }],
    });
    return res.status(201).json({
      message: {
        type: "success",
        msg: "first note inserted successfully...!",
        // insertNote,
      },
    });
  }
  try {
    // console.log(userNotes);
    const updatedNote = await userNotes.addNewNote(newNote);
    if (!updatedNote) {
      return res.status(200).json({
        message: {
          type: "success",
          msg: "error occured while creating the note ",
        },
      });
    }
    return res.status(200).json({
      message: {
        type: "success",
        msg: "Note created successfully",
      },
      updatedNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error :", error);
  }
});

// route(2) : get all notes of that user *--user login required--*
exports.getNotes = Promise(async (req, res, next) => {
  try {
    const user = await Note.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: {
          type: "danger",
          msg: "you don't have notes...!",
        },
      });
    }
    return res.status(200).json({
      success: true,
      notes: user.notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: {
        type: "danger",
        msg: "error occured while fetching notes! try again.",
      },
      error,
    });
  }
});

// route(3) : edit the existing note *--user login required--*
exports.updateNote = Promise(async (req, res, next) => {
  const noteId = req.params.id;
  const updatedData = {
    title: req.body?.title,
    description: req.body?.description,
    label: req.body?.label,
    deadLine: req.body?.deadLine,
  };
  try {
    const user = await Note.updateOne(
      {
        "notes._id": noteId,
      },
      {
        $set: {
          "notes.$.note.title": updatedData.title,
          "notes.$.note.description": updatedData.description,
          "notes.$.note.label": updatedData.label,
          "notes.$.note.deadLine": updatedData.deadLine,
        },
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({
        message: {
          type: "danger",
          msg: "Selected note doesn't exist",
        },
      });
    }
    return res.status(200).json({
      success: true,
      notes: user.notes,
      message: {
        type: "success",
        msg: "Note updated successfully..!",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: {
        type: "danger",
        msg: "Internal server error",
      },
      error,
    });
  }
});

// route(4) : delete the existing note *--user login required--*
exports.deleteNote = Promise(async (req, res, next) => {
  const noteId = req.params.id;
  // console.log("user :" + req.user.id + " note : " + noteId);
  try {
    let userNotes = await Note.findOne({ _id: req.user.id });
    if (!userNotes) {
      return res.status(200).json({
        message: {
          type: "danger",
          msg: "Selected note doesn't exist",
        },
      });
    }
    updatedNotes = await userNotes.deleteNote(noteId);
    return res.status(200).json({
      success: true,
      notes: updatedNotes,
      message: {
        type: "success",
        msg: "Note deleted successfully",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: {
        type: "danger",
        msg: "internal server error",
      },
      error,
    });
  }
});
