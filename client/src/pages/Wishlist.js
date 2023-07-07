import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Get the wishlist products
  const getWishlist = async () => {
    try {
      const { data } = await axios.get("/api/v1/wishlist/get-wishlist");
      setWishlist(data.wishlist[0].products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <Layout>
      <div className="home-page mb-5">
        {wishlist.length === 0 ? (
          <p>There are no products in Wishlist</p>
        ) : (
          <div className="d-flex flex-wrap">
            {wishlist.map((product) => (
              <div className="card m-2" key={product._id}>
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                  onClick={() => navigate(`/product/${product.slug}`)}
                />
                <div className="card-body">
                  <div
                    className="card-name-price"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    <h5 className="card-title">{product.name}</h5>
                    <h5 className="card-title card-price">
                      {product.price.toLocaleString("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      })}
                    </h5>
                  </div>
                  <p
                    className="card-text "
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    {product.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <div
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#e150f9",
                        color: "white",
                        textAlign: "center",
                        padding: "3px 6px ",
                        borderRadius: "20px",
                      }}
                    >
                      CHOICE
                    </div>
                    <div>
                      <AiOutlineDelete
                        onClick={async () => {
                          try {
                            const res = await axios.delete(
                              `/api/v1/wishlist/remove-from-wishlist/${product._id}`,
                              {
                                productId: product._id,
                              }
                            );
                            console.log(res);
                            if (res && res.data.success) {
                              toast.success(res.data && res.data.message);
                              navigate("/login");
                            } else {
                              toast.success(res.data.message);
                            }
                          } catch (error) {
                            console.log(error);
                            toast.error("Something went wrong");
                          }
                        }}
                        size={25}
                        style={{ marginRight: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { MdOutlineFavoriteBorder } from "react-icons/md";
// import { AiOutlineDelete } from "react-icons/ai";

// export default function Wishlist() {
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get the wishlist products
//   const getWishlist = async () => {
//     try {
//       console.log("Running");
//       const { data } = await axios.get("/api/v1/wishlist/get-wishlist");
//       setWishlist(data.wishlist[0].products);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // Remove a product from the wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       const res = await axios.delete(
//         `/api/v1/wishlist/remove-from-wishlist/${productId}`
//       );
//       console.log(res);
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);
//         navigate("/login");
//       } else {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   useEffect(() => {
//     getWishlist();
//   }, []);

//   return (
//     <Layout>
//       <div className="home-page mb-5">
//         {loading ? (
//           <p>Loading...</p>
//         ) : wishlist.length === 0 ? (
//           <h3 className="d-flex flex-row text-center p-5  opacity">
//             There are no products in Wishlist
//           </h3>
//         ) : (
//           <div className="d-flex flex-wrap">
//             {wishlist.map((product) => (
//               <div className="card m-2" key={product._id}>
//                 <img
//                   src={`/api/v1/product/product-photo/${product._id}`}
//                   className="card-img-top"
//                   alt={product.name}
//                   onClick={() => navigate(`/product/${product.slug}`)}
//                 />
//                 <div className="card-body">
//                   <div
//                     className="card-name-price"
//                     onClick={() => navigate(`/product/${product.slug}`)}
//                   >
//                     <h5 className="card-title">{product.name}</h5>
//                     <h5 className="card-title card-price">
//                       {product.price.toLocaleString("en-PK", {
//                         style: "currency",
//                         currency: "PKR",
//                       })}
//                     </h5>
//                   </div>
//                   <p
//                     className="card-text"
//                     onClick={() => navigate(`/product/${product.slug}`)}
//                   >
//                     {product.description.substring(0, 60)}...
//                   </p>
//                   <div className="card-name-price">
//                     <div
//                       style={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e150f9",
//                         color: "white",
//                         textAlign: "center",
//                         padding: "3px 6px",
//                         borderRadius: "20px",
//                       }}
//                     >
//                       CHOICE
//                     </div>
//                     <div>
//                       <AiOutlineDelete
//                         onClick={() => removeFromWishlist(product._id)}
//                         size={25}
//                         style={{ marginRight: "10px" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

//////////////////////////////////////////////////////////////
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineDelete } from "react-icons/ai";

// export default function Wishlist() {
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get the wishlist products
//   const getWishlist = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/wishlist");
//       setWishlist(data.wishlist.products);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // Remove a product from the wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       const res = await axios.delete(`/api/v1/wishlist/${productId}`);
//       console.log(res);
//       if (res && res.data.success) {
//         toast.success(res.data.message);
//         getWishlist(); // Refresh the wishlist after removing a product
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   useEffect(() => {
//     getWishlist();
//   }, []);

//   return (
//     <Layout>
//       <div className="home-page mb-5">
//         {loading ? (
//           <p>Loading...</p>
//         ) : wishlist.length === 0 ? (
//           <h3 className="d-flex flex-row text-center p-5  opacity">
//             There are no products in Wishlist
//           </h3>
//         ) : (
//           <div className="d-flex flex-wrap">
//             {wishlist.map((product) => (
//               <div className="card m-2" key={product._id}>
//                 <img
//                   src={`/api/v1/product/product-photo/${product._id}`}
//                   className="card-img-top"
//                   alt={product.name}
//                   onClick={() => navigate(`/product/${product.slug}`)}
//                 />
//                 <div className="card-body">
//                   <div
//                     className="card-name-price"
//                     onClick={() => navigate(`/product/${product.slug}`)}
//                   >
//                     <h5 className="card-title">{product.name}</h5>
//                     <h5 className="card-title card-price">
//                       {product.price.toLocaleString("en-PK", {
//                         style: "currency",
//                         currency: "PKR",
//                       })}
//                     </h5>
//                   </div>
//                   <p
//                     className="card-text"
//                     onClick={() => navigate(`/product/${product.slug}`)}
//                   >
//                     {product.description.substring(0, 60)}...
//                   </p>
//                   <div className="card-name-price">
//                     <div
//                       style={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e150f9",
//                         color: "white",
//                         textAlign: "center",
//                         padding: "3px 6px",
//                         borderRadius: "20px",
//                       }}
//                     >
//                       CHOICE
//                     </div>
//                     <div>
//                       <AiOutlineDelete
//                         onClick={() => removeFromWishlist(product._id)}
//                         size={25}
//                         style={{ marginRight: "10px" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }
