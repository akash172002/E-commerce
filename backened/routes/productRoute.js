const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createPrdouctReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");

const { isAuthenticatedUser, authroizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authroizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authroizeRoles("admin"),
    isAuthenticatedUser,
    createProduct
  );

router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authroizeRoles("admin"),
    isAuthenticatedUser,
    updateProduct
  );
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authroizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetail);

router.route("/review").put(isAuthenticatedUser, createPrdouctReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
