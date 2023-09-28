const Article = require("../models/articleModel");
const User = require("../models/userModel");

// create article
const creatArticle = async (req, res) => {
  const { title, story, photo, creator } = req.body;

  if (!title || !story || !photo || !creator) {
    res.status(404).send("Details missing");
    return;
  }

  try {
    const article = await Article.create({
      title,
      story,
      photo,
      creator,
    });

    if (article) {
      res.status(201).send(article);
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

const fetchArticles = async (req, res, next) => {
  try {
    // Get all article items from the database
    const allArticle = await Article.find();

    // Randomly shuffle the array of food items
    const shuffledFood = shuffleArray(allArticle);

    res.status(200).send(shuffledFood);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteArticle = async (req, res, next) => {
  // check if article exist

  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(400).json({ message: "article not found" });
    return;
  }

  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete article" });
  }
  // console.log(req.params);
};

// const fetchArticleBasedOnSth = async (req, res) => {
//   const { category } = req.body;
//   try {
//     const article = await Food.find({
//       vendor: vendor,
//     });
//     res.status(200).json(food);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const commentOnArticle = async (req, res) => {
  try {
    // const { postId } = req.params;
    const { username, comment } = req.body;

    // Find the article by ID
    const article = await Article.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the article doesn't exist, return an error
    if (!article) {
      return res.status(404).json({ error: "article not found" });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Create a new comment
    const newComment = {
      username,
      comment,
    };

    // Add the comment to the post's comments array
    article.comments.push(newComment);

    // Save the updated post with the new comment
    await article.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed To Comment" });
  }
};

const likeArticle = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the article item by ID
    const article = await Article.findById(req.params.id);

    // If the article doesn't exist, return an error
    if (!article) {
      return res.status(404).json({ error: "article not found" });
    }

    // Find if the username exists
    const user = await User.findOne({ username });
    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already liked this article
    const hasLiked = article.likes.some((like) => like.username === username);

    if (hasLiked) {
      // If the user has already liked it, remove their like
      article.likes = article.likes.filter(
        (like) => like.username !== username
      );
      await article.save();
      res.status(200).json({ message: "Unliked successfully" });
    } else {
      // If the user hasn't liked it yet, add their like
      const newLike = {
        username,
      };
      article.likes.push(newLike);
      await article.save();
      res.status(201).json({ message: "Liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed To Like" });
  }
};

const fetchSpecificArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    res.status(200).send(article);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificArticle = async (req, res) => {
  try {
    const updatedArticle = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  creatArticle,
  fetchArticles,
  likeArticle,
  deleteArticle,
  commentOnArticle,
  fetchSpecificArticle,
  updateSpecificArticle,
};
