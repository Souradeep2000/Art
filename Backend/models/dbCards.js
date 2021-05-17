import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
  {
    src: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    p: { type: String, required: true },
    a: String,
    price: { type: Number, required: true },
    star: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const dbCards = mongoose.model("cards", cardSchema);

export default dbCards;
