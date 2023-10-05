const express = require("express");
const {
  registerUser,
  loginUser,
  allUsers,
  checkIfUserAlreadyExists,
  getUser,
  deleteUser,
  updateAccount,
} = require("../controllers/userController");
const router = express.Router();

// /api/v1/users

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", allUsers);
router.post("/check", checkIfUserAlreadyExists);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateAccount);

module.exports = router;
