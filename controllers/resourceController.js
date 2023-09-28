const Resource = require("../models/resourceModel");
const User = require("../models/userModel");

// create resource
const creatResource = async (req, res) => {
  const { title, category, content, link } = req.body;

  if (!title || !content || !category || !link) {
    res.status(404).send("Details missing");
    // console.log(req.body);
    return;
  }

  try {
    const resource = await Resource.create({
      title,

      category,
      content,
      link,
    });

    if (resource) {
      res.status(201).send(resource);
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

const fetchResource = async (req, res, next) => {
  try {
    // Get all resource items from the database
    const allResource = await Resource.find();

    // Randomly shuffle the array of food items
    const shuffledFood = shuffleArray(allResource);

    res.status(200).send(shuffledFood);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteResource = async (req, res, next) => {
  // check if resource exist

  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(400).json({ message: "resource not found" });
    return;
  }

  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete resource" });
  }
  // console.log(req.params);
};

const fetchResourceBasedOnSth = async (req, res) => {
  const { category } = req.body;
  try {
    const resource = await Resource.find({
      category,
    });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchSpecificResource = async (req, res) => {
  try {
    const resource = await Resource.findOne({ _id: req.params.id });
    res.status(200).send(resource);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificResource = async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  creatResource,
  fetchResource,
  deleteResource,
  fetchSpecificResource,
  updateSpecificResource,
  fetchResourceBasedOnSth,
};
