const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { getConnectionString } = require("./DB_connection/getConnectionString.js");
const router = require("./routes/routes.js");

const app = express();
dotenv.config({ path: path.resolve(__dirname, ".env") });
const port = process.env.PORT || 3000;

const connectionString = getConnectionString();


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "public/")));

app.use("/", router);

// 404
app.route("*").get((req, res) => {
  res.render("pages/404.ejs");
});

// listening
app.listen(port, () => {
  console.log(`Application is listening on port: ${port}`);
});

exports.app = app;