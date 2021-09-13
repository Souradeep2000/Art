import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
  {
    src: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    p: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    star: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const dbCards = mongoose.model("cards", cardSchema);

export default dbCards;
