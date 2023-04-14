const { model, Schema } = require("mongoose");

const noteSchema = new Schema({
  // userId: {
  //   type: String,
  //   required: true,
  // },
  note: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    deadLine: {
      type: Date,
      default: Date.now(),
    },
  },
});

const note_Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    // notes: [{ type: noteSchema, required: true }],
    notes: [
      {
        type: noteSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
note_Schema.methods.addNewNote = async function (note) {
  // console.log(note);
  this.notes = this.notes.concat({ note: note });
  await this.save();
  return this.notes;
};

note_Schema.methods.deleteNote = async function (noteId) {
  (this.notes = this.notes.filter((ele) => {
    return ele.id !== noteId;
  }));
  await this.save();
  return this.notes
};

module.exports = model("Note", note_Schema);
