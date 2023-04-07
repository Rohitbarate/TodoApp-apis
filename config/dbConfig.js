const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectToDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully....!");
    })
    .catch(() => {
      console.log("Database Connection Failed...!");
      console.log(err);
      process.exit(1);
    });
};


module.exports = connectToDB;