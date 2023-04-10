const { model, Schema } = require("mongoose");

const noteSchema = new Schema(
  {
    userId:{
      type:String,
      required:true
    },
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
    },
  },
  {
    timestamps: true,
  }
);

// const note_Schema = new Schema(
//   {
//     _id: {
//       type: Object,
//       required: true,
//     },
//     notes: [{ type: noteSchema, required: true }],
//   },
//   {
//     timestamps: true,
//   }
// );

module.exports = model("Note", noteSchema);
