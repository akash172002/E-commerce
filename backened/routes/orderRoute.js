const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authroizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/orders/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/order/me").get(isAuthenticatedUser, myOrder);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authroizeRoles("admin"), getAllOrder);

router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authroizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authroizeRoles("admin"), deleteOrder);

module.exports = router;
