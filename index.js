require("dotenv").config();
const app = require('./app')
const connectToDB = require('./config/dbConfig')
const  PORT = process.env.PORT

connectToDB(process.env.DB_URL);

app.listen(PORT,()=>{
    console.log(`Todo App is running on port : ${PORT}`)
})