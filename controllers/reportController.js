const Report = require("../models/reportModel");
const User = require("../models/userModel");

// create report
const creatReport = async (req, res) => {
  const { location, desc, phone, username, progress } = req.body;

  if (!username || !location || !desc || !phone) {
    res.status(404).send("Details missing");
    // console.log(req.body);
    return;
  }

  try {
    const report = await Report.create({
      location,
      desc,
      phone,
      username,
      progress,
    });

    if (report) {
      res.status(201).send(report);
      return;
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to shuffle an array randomly
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const fetchReports = async (req, res, next) => {
  try {
    // Get all reports from the database
    const allReports = await Report.find().sort({ $natural: -1 });

    // Randomly shuffle the array of food items
    const shuffledReports = shuffleArray(allReports);

    res.status(200).send(allReports);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteReport = async (req, res, next) => {
  // check if report exist

  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(400).json({ message: "report not found" });
    return;
  }

  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete report" });
  }
  // console.log(req.params);
};

const fetchReportBasedOnSth = async (req, res) => {
  const { username } = req.body;

  try {
    const report = await Report.find({
      username,
    }).sort({ $natural: -1 });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchSpecificReport = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id });
    res.status(200).send(report);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificReport = async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  creatReport,
  fetchReports,
  deleteReport,
  fetchSpecificReport,
  updateSpecificReport,
  fetchReportBasedOnSth,
};
