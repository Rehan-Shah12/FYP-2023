import axios from "axios";

export const updateProductStock = async (cart) => {
  try {
    for (const item of cart) {
      const productId = item._id; // Use _id instead of productId
      const quantity = item.quantity;
      // Make an API request to update the product quantity
      await axios.put(`/api/v1/update-product/${productId}`, { quantity });
    }
  } catch (error) {
    console.log(error);
  }
};
