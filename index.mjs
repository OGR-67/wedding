import express from "express";
import {
  addNewGuest,
  getAllGuests,
  getGuestByID,
  updateGuestByID,
  deleteGuestByID,
} from "./controllers/guestController.mjs";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/ExpressDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
