import mongoose from "mongoose";
import { GuestSchema } from "../models/guestSchema.mjs";

const Guest = mongoose.model("Guest", GuestSchema);

// Error handlers
const ERRORS_HANDLER = {
  11000: userAlreadyExists,
}

function userAlreadyExists (res) {
  let context = {error: "Vous vous êtes déja inscrit. Contacter moi directement pour effectuer une modification."}
  res.render("pages/form.ejs", context)
}


// Controllers
export const addNewGuest = (req, res) => {
  let newGuest = new Guest(req.body);
  newGuest.save((err, answer) => {
    if (err) {
      let errorCode = err.code;
      let errorHandler = ERRORS_HANDLER[errorCode];
      errorHandler(res)
    } else {
      res.redirect('/');
    }
  });
};

export const getAllGuests = (req, res) => {
  Guest.find({}, (err, answer) => {
    if (err) {
      res.send(err);
    } else {
      let context = {guests: answer}
      res.render("pages/guestsList.ejs", context);
    }
  });
};

export const getGuestByID = (req, res) => {
  Guest.find({ _id: req.params.guestID }, (err, answer) => {
    if (err) {
      res.send(err);
    } else {
      res.send(answer);
    }
  });
};

export const updateGuestByID = (req, res) => {
  Guest.findOneAndUpdate(
    { _id: req.params.guestID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, contact) => {
      if (err) {
        res.send(err);
      } else {
        res.send(contact);
      }
    }
  );
};

export const deleteGuestByID = (req, res) => {
  Guest.deleteOne({ _id: req.params.guestID }, (err, contact) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Successfully deleted guest from records" });
    }
  });
};
