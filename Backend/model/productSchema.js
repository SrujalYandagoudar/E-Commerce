import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  category: { type: String, required: true },
  stock: { type: Number, min: 0, required: true },
  image: { type: String },
  ratings: { type: Number, min: 0, max: 5, default: 0, required: true },
});

export const Product = mongoose.model("Product", productSchema);
