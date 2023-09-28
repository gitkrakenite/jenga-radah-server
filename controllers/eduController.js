const Education = require("../models/educationModel");
const User = require("../models/userModel");

// create education
const creatEdu = async (req, res) => {
  const { title, photo, category, content } = req.body;

  if (!title || !content || !photo || !category) {
    res.status(404).send("Details missing");
    // console.log(req.body);
    return;
  }

  try {
    const edu = await Education.create({
      title,
      photo,
      category,
      content,
    });

    if (edu) {
      res.status(201).send(edu);
      return;
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

// const fetchFood = async (req, res, next) => {
//   try {
//     const food = await Food.find();
//     res.status(200).send(food);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// Function to shuffle an array randomly
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const fetchEdu = async (req, res, next) => {
  try {
    // Get all edu items from the database
    const allEdu = await Education.find();

    // Randomly shuffle the array of food items
    const shuffledFood = shuffleArray(allEdu);

    res.status(200).send(shuffledFood);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteEdu = async (req, res, next) => {
  // check if edu exist

  const edu = await Education.findById(req.params.id);

  if (!edu) {
    res.status(400).json({ message: "edu not found" });
    return;
  }

  try {
    await Education.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete edu" });
  }
  // console.log(req.params);
};

const fetchEduBasedOnSth = async (req, res) => {
  const { category } = req.body;
  try {
    const edu = await Education.find({
      category,
    });
    res.status(200).json(edu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchSpecificEdu = async (req, res) => {
  try {
    const edu = await Education.findOne({ _id: req.params.id });
    res.status(200).send(edu);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificEdu = async (req, res) => {
  try {
    const updatedEdu = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedEdu);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  creatEdu,
  fetchEdu,
  deleteEdu,
  fetchSpecificEdu,
  updateSpecificEdu,
  fetchEduBasedOnSth,
};
