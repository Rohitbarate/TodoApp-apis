require("dotenv").config();
const app = require("./app");
const connectToDB = require("./config/dbConfig");
const PORT = process.env.PORT;

connectToDB(process.env.DB_URL);

app.listen(PORT, () => {
  console.log(`Todo App is running on port : ${PORT}`);
});


// ........ // ** TODO START ** // ........ //

// 0) add alert object to all res.json for alert e.g. {alert:{"message":"login successfully","type":"success"}}

// 1) check the note which user want to update is present in that user notes (note route(3));

// 2) check the note which user want to delete is present in that user notes (note route(4));


// ........ // ** TODO END ** // ......... //
