const express = require("express");
const {
  creatEdu,
  updateSpecificEdu,
  fetchEdu,
  deleteEdu,
  fetchSpecificEdu,
  fetchEduBasedOnSth,
} = require("../controllers/eduController");
const router = express.Router();

router.post("/create", creatEdu); //create edu
router.put("/edit/:id", updateSpecificEdu); // edit edu
router.get("/all", fetchEdu); // see all edu
router.delete("/delete/:id", deleteEdu); // delete edu
router.get("/specific/:id", fetchSpecificEdu); //specific edu
router.post("/cat", fetchEduBasedOnSth); //category edu
// router.post("/comment/:id", commentOnArticle); //comment on food
// router.post("/like/:id", likeArticle); //like product

module.exports = router;
