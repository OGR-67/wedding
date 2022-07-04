import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GuestSchema = new Schema({
  firstName: {
    type: String,
    required: "No first name can be found.",
  },
  lastName: {
    type: String,
    required: "No last name can be found.",
  },
  email: {
    type: String,
    required: "No email can be found.",
    unique: true,
  },
  phone: {
    type: Number,
    required: "No phone number can be found.",
  },
  is_accompanied: {
    type: String,
  },
  childrenNumber: {
    type: Number,
    required: "No children number number can be found.",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});
