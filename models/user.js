const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    mobileNo: {
      type: Number,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// methods

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, mobileNo: this.mobileNo },process.env.JWT_SECRET);
};

module.exports = model("User", userSchema);
