import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AdressSchema = new Schema({
  city: {
    type: String,
    required: "Entrer votre ville",
  },
  street: {
    type: String,
    required: "Entrer votre rue",
  },
  houseNumber: {
    type: String,
    required: "Entrer votre numero",
  },
});

export const GuestSchema = new Schema({
  firstName: {
    type: String,
    required: "Entrer votre prénom",
  },
  lastName: {
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
  adress: {
    type: AdressSchema,
    required: "Entrer une adresse valide",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});
