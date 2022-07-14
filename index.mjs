import express from "express";
import {
  addNewGuest,
  getAllGuests,
  getGuestByID,
  updateGuestByID,
  deleteGuestByID,
} from "./controllers/guestController.mjs";
import { getHotels } from "./controllers/hotelsController.mjs";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

userName = process.env.mongoDBUser
password = process.env.mongoDBPassword

const connectionString = `mongodb+srv://${userName}:${password}@wedding.dxud6.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.route("/").get((req, res) => {
  let context = { something: 12 };
  res.render("pages/index.ejs", context);
});

app.route("/infos").get((req, res) => {
  res.render("pages/informations.ejs");
});

app.route("/about").get((req,res) => {
  res.render("pages/about.ejs")
})

app.route("/hotels").get((req, res) => {
  getHotels(req, res);
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
app.route("*").get((req,res) => {
  res.render("pages/404.ejs")
});

// listening
app.listen(port, () => {
  console.log(`Application is listening on port: ${port}`);
});
