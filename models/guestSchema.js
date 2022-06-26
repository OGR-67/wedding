import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const guestSchema = new Schema({
  firstName: {
    type: String,
    required: "Entrer votre prénom",
  },
  lastname: {
    type: String,
    required: "Entrer votre nom",
  },
  email: {
    type: String,
    required: "Entrer une adresse E-mail",
  },
  phone: {
    type: Number,
    required: "Entrer votre numéro",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});
