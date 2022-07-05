import mongoose from "mongoose"

const { Schema, model } = mongoose

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
})

export default model("Product", ProductSchema)
