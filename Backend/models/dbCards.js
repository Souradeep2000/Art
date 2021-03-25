import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  src: String,
  title: String,
  p: String,
  a: String,
  star: Number,
});

const dbCards = mongoose.model("cards", cardSchema);

export default dbCards;
