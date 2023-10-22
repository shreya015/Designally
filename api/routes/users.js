const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const multer = require("multer");

//Update
// router.put("/:id", async (req, res) => {
//   try {
//     // Check if the user is authenticated and authorized to update the account
//     if (req.body.userId !== req.params.id) {
//       return res.status(401).json("You can update only your account.");
//     }

//     // Check if the request contains a password update
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }

//     // Update the user's information
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );

//     // Return the updated user data
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json("An error occurred while updating the account.");
//   }
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profilePic");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

router.put("/:id", upload.single("profilePic"), async (req, res) => {
  try {
    // Check if the user is authenticated and authorized to update the account
    if (req.body.userId !== req.params.id) {
      return res.status(401).json("You can update only your account.");
    }

    // Check if the request contains a password update
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Check if a new profile picture file has been uploaded
    // if (req.file) {
    //   // Handle profile picture update here
    //   const profilePic = req.file.filename;

    //   // Update the user's profilePic field in the database
    //   await User.findByIdAndUpdate(req.params.id, { profilePic });
    // }

    // Update the user's information except for profilePic and password (handled above)
    const { profilePic, password, ...updatedData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    // Return the updated user data
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json("An error occurred while updating the account.");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username }, {useFindAndModify: false});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
        
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;