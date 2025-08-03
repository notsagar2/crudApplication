
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");

const app = express();
app.use(express.json());
app.use(cors());

databaseConnection();

app.get("/", (req, res) => res.send("Hello World"));
app.use("/book", bookRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
