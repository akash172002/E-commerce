const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updateUserPassword,
  updateUserProfile,
  getAllUser,
  getSingleUser,

  updateUserRole,
  delteteUser,
} = require("../controllers/userConroller");
const { isAuthenticatedUser, authroizeRoles } = require("../middleware/auth");
const { route } = require("./userRoute");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetail);

router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authroizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authroizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authroizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authroizeRoles("admin"), delteteUser);

module.exports = router;
