const express = require("express");
const {
  creatReport,
  fetchReports,
  deleteReport,
  fetchSpecificReport,
  updateSpecificReport,
  fetchReportBasedOnSth,
} = require("../controllers/reportController");
const router = express.Router();

router.post("/create", creatReport); //create report
router.put("/edit/:id", updateSpecificReport); // update report
router.get("/all", fetchReports); // see all reports
router.delete("/delete/:id", deleteReport); // delete report
router.get("/specific/:id", fetchSpecificReport); //specific report
router.post("/cat", fetchReportBasedOnSth); //username report

module.exports = router;
