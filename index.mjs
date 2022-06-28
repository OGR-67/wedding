import express from "express";
import {
  addNewGuest,
  getAllGuests,
  getGuestByID,
  updateGuestByID,
  deleteGuestByID,
} from "./controllers/guestController.mjs";
import { getHotels } from "./controllers/hotelsController.mjs"
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/ExpressDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app
  .route("/")
  .get((req, res) => {
    let context = {something: 12}
   res.render("index.ejs", context); 
  })

app
  .route("/hotels")
  .get((req, res) => {
    getHotels(req, res);
  })

app
  .route("/register")
  .get((req, res) => {
   let context = {hotels: ["hotel 1", "hotel 2", "hotel 3", "hotel 4"]}
   res.render("form.ejs", context)
  })

app
  .route("/guest")
  .get((req, res, next) => {
    console.log(`Request from : ${req.originalUrl}`);
    console.log(`Request type : ${req.method}`);
    next();
  }, getAllGuests)
  .post(addNewGuest);

app
  .route("/guest/:guestID")
  .get(getGuestByID)
  .put(updateGuestByID)
  .delete(deleteGuestByID);

app.listen(port, () => {
  console.log(`Application is listening on port: ${port}`);
});
