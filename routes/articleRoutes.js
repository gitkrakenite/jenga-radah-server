const express = require("express");
const {
  creatArticle,
  updateSpecificArticle,
  fetchArticles,
  deleteArticle,
  fetchSpecificArticle,
  commentOnArticle,
  likeArticle,
} = require("../controllers/articleController");
const router = express.Router();

router.post("/create", creatArticle); //create food
router.put("/edit/:id", updateSpecificArticle); // edit foos
router.get("/all", fetchArticles); // see all food
router.delete("/delete/:id", deleteArticle); // delete food
router.get("/specific/:id", fetchSpecificArticle); //specific food
router.post("/comment/:id", commentOnArticle); //comment on food
router.post("/like/:id", likeArticle); //like product
// router.post("/vendor", fetchFoodBasedOnSth);

module.exports = router;
