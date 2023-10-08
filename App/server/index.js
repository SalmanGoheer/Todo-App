const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const todoItems = require('./routes/TodoItems');


const TodoItemRoute = require('./routes/todoItems');



dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true,})
.then(() => console.log("db connected"))
.catch(err => console.log(err))

app.use("/", TodoItemRoute);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
