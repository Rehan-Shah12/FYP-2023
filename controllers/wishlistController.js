// import slugify from "slugify";
// import wishlistModel from "../models/wishlistModel.js";
// import userModel from "../models/userModel.js";
// import ProductModel from "../models/productModel.js";

// export const addToWishlist = async (req, res) => {
//   try {
//     console.log(req.body);
//     console.log(req.user);
//     const userId = req.user._id;
//     const { productId } = req.body;
//     const wishlist = await wishlistModel.findOne({ userId });

//     if (wishlist) {
//       if (wishlist.products.includes(productId)) {
//         return res
//           .status(400)
//           .json({ message: "Product already added to wishlist" });
//       }
//       if (wishlist.scrapeProducts.includes(productId)) {
//         return res
//           .status(400)
//           .json({ message: "Product already added to wishlist" });
//       }

//       const productExists = await ProductModel.findById(productId);

//       if (productExists) {
//         wishlist.products.push(productId);
//       } else {
//         const mappedProduct = await getProductDetails(productId);
//         wishlist.scrapeProducts.push(mappedProduct);
//       }

//       await wishlist.save();

//       return res.status(200).json({ message: "Product added to wishlist" });
//     }

//     const newWishlist = new wishlistModel({
//       userId,
//       products: [productId],
//     });

//     await newWishlist.save();

//     const user = await userModel.findById(userId);
//     user.wishlist = newWishlist._id;
//     await user.save();

//     return res.status(200).json({ message: "Product added to favorites" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Function to get product details for mapping
// // Function to get product details for mapping
// // Function to get product details for mapping
// const getProductDetails = async (productId) => {
//   // Read the contents of the search_data.json file
//   const searchData = fs.readFileSync("search_data.json");
//   const searchResults = JSON.parse(searchData);

//   // Find the product with the matching productId
//   const product = searchResults.find((result) => result.link === productId);

//   if (product) {
//     // Return the complete product object or the required mapped information
//     return {
//       // _id: product.link,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       site: product.site,
//     };
//   }

//   return null; // Return null if the product is not found in the search_data.json file
// };

// //Update WishList
// export const removeFromWishlist = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const userId = req.user._id;

//     const wishlist = await wishlistModel.findOne({ userId });

//     // Remove the product ID from the favorites document's products array
//     wishlist.products = wishlist.products.filter(
//       (id) => id.toString() !== productId
//     );

//     // Save the updated user and favorites document
//     await wishlist.save();

//     res.status(200).json({ message: "Removed from Wishlist" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ success: false, error: "Server Error" });
//   }
// };
// //Get All Products from wishlist
// export const getWishlist = async (req, res) => {
//   try {
//     console.log("Wishlist Getting!!!");
//     // console.log(req.user);
//     const wishlist = await wishlistModel
//       .find({ userId: req.user._id })
//       .populate("products")
//       .lean();
//     // console.log(wishlist);
//     res.json({ wishlist });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

import wishlistModel from "../models/wishlistModel.js";
import userModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const wishlist = await wishlistModel.findOneAndUpdate(
      { userId },
      { $addToSet: { products: productId } },
      { upsert: true }
    );

    if (wishlist) {
      return res.status(200).json({ message: "Product added to wishlist" });
    }

    const newWishlist = new wishlistModel({
      userId,
      products: [productId],
    });

    await newWishlist.save();

    const user = await userModel.findById(userId);
    user.wishlist = newWishlist._id;
    await user.save();

    return res.status(200).json({ message: "Product added to wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    await wishlistModel.updateOne(
      { userId },
      { $pull: { products: productId } }
    );

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistModel
      .findOne({ userId: req.user._id })
      .populate("products")
      .lean();

    res.send(wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
