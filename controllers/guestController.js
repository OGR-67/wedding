import mongoose, { mongo } from "mongoose";
import { guestSchema } from "../models";

const Guest = mongoose.model("Guest", guestSchema);

export const addNewGuest = (req, res) => {
  let newGuest = new Guest(req.body);
  newGuest.save((err, answer) => {
    if (err) {
      res.send(err);
    } else {
      res.send(answer);
    }
  });
};

export const getAllGuests = (req, res) => {
  Guest.find({}, (err, answer) => {
    if (err) {
      res.send(err);
    } else {
      res.send(answer);
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
  Guest.remove({ _id: req.params.guestID }, (err, contact) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Successfully deleted guest from records" });
    }
  });
};
