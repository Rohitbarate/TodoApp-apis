const { model, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      select: true,
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

//..... //....  methods  ....//.... //

// save excripted passwork before store the data
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password,10);
});

// method to get the JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id, mobileNo: this.mobileNo },
    process.env.JWT_SECRET
  );
};

// Validate the password with passed on user password
userSchema.methods.isPasswordCorrect = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = model("User", userSchema);
