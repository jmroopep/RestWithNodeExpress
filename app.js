const express = require("express");
const adminRouter = require("./routers/adminRouter.js");
const mongoose = require("mongoose");

const app = express();

const port = process.env.port || 3000;

const bookRouter = express.Router();
bookRouter.route("/books").get((req, res) => {
  (async function getBooks() {
    const db = await mongoose.connect(
      "mongodb+srv://janeaquafina:PSofAKVbDXNtqowd@books.84ky1vy.mongodb.net/bookdata?retryWrites=true&w=majority"
    );
    const Book = require("./models/bookModel");
    const books = await Book.find();
    res.json(books);
  })();
});

app.use("/api", bookRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API!");
});

app.listen(port, () => {
  console.log("Running on port " + port);
});
