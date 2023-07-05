import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  scrapeProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export default mongoose.model("Wishlist", wishlistSchema);
