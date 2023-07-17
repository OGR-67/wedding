const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const {
  addNewGuest,
  getAllGuests,
  getGuestByID,
  updateGuestByID,
  deleteGuestByID,
} = require("./controllers/guestController.js");
const { getHotels } = require("./controllers/hotelsController.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
dotenv.config({ path: path.resolve(__dirname, ".env") });
const port = process.env.PORT || 3000;

let userName = String();
let password = String();

if (process.env.NODE_ENV === "production") {
  userName = process.env.MONGO_DB_USER;
  password = process.env.MONGO_DB_PASSWORD;
} else {
  const rawdata = fs.readFileSync("mongo-credentials.json");
  const credentials = JSON.parse(rawdata);
  userName = credentials.userName;
  password = credentials.password;
}

const connectionString = `mongodb+srv://${userName}:${password}@wedding.dxud6.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "public/")));

// Routes
app.route("/").get((req, res) => {
  const context = { something: 12 };
  res.render("pages/index.ejs", context);
});

app.route("/infos").get((req, res) => {
  res.render("pages/informations.ejs");
});

app.route("/about").get((req, res) => {
  res.render("pages/about.ejs");
});

app.route("/hotels").get(async (req, res) => {
  await getHotels(req, res);
});

app
  .route("/register")
  .get((req, res) => {
    res.render("pages/form.ejs");
  })
  .post(addNewGuest);

app.route("/guests").get(getAllGuests);

app
  .route("/guest/:guestID")
  .get(getGuestByID)
  .put(updateGuestByID)
  .delete(deleteGuestByID);

// 404
app.route("*").get((req, res) => {
  res.render("pages/404.ejs");
});

// listening
app.listen(port, () => {
  console.log(`Application is listening on port: ${port}`);
});
