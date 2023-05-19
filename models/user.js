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
      required: false,
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
    provider: {
      type: String,
      required: false,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
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
  this.password = await bcrypt.hash(this.password, 10);
});

// method to get the JWT token
userSchema.methods.getJwtToken = async function () {
  const jwtToken = jwt.sign(
    { id: this._id, mobileNo: this.mobileNo },
    process.env.JWT_SECRET
  );
  this.tokens = this.tokens.concat({ token: jwtToken });
  await this.save();
  return jwtToken;
};

// Validate the password with passed on user password
userSchema.methods.isPasswordCorrect = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

// logout user by deleting their token
userSchema.methods.deleteToken = async function (token) {
  this.tokens = this.tokens.filter((jwt) => {
    return jwt.token !== token;
  });
  await this.save();
  return this.tokens;
};

module.exports = model("User", userSchema);
