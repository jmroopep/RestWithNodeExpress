/* eslint-disable no-debugger */
const express = require("express");
const adminRouter = require("./routers/adminRouter.js");
const mongoose = require("mongoose");
const debug = require("debug")("app");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));

const port = process.env.port || 3000;

const bookRouter = express.Router();
bookRouter.route("/books").get((req, res) => {
  (async function getBooks() {
    const { query } = req;
    try {
      await mongoose.connect(
        "mongodb+srv://janeaquafina:PSofAKVbDXNtqowd@books.84ky1vy.mongodb.net/bookdata?retryWrites=true&w=majority"
      );
      const Book = require("./models/bookModel");
      const books = await Book.find(query);
      res.json(books);
    } catch (error) {
      debug(error.stack);
    }
  })();
});

app.use("/api", bookRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  debugger;
  res.send("Welcome to my Nodemon API!");
});

app.listen(port, () => {
  debug("Running on port " + port);
});
