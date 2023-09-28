const express = require("express");
const {
  creatResource,
  updateSpecificResource,
  fetchResource,
  deleteResource,
  fetchSpecificResource,
  fetchResourceBasedOnSth,
} = require("../controllers/resourceController");
const router = express.Router();

router.post("/create", creatResource); //create resource
router.put("/edit/:id", updateSpecificResource); // edit resource
router.get("/all", fetchResource); // see all resource
router.delete("/delete/:id", deleteResource); // delete resource
router.get("/specific/:id", fetchSpecificResource); //specific resource
router.post("/cat", fetchResourceBasedOnSth); //category resource

module.exports = router;
