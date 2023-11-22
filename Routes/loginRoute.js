const User = require("../model/Users.js");
const bcrypt = require("bcrypt");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const eUser = await User.findOne({ email });
    if (!eUser) {
      res.send({
        message: "The user doesn't exist, Please signup",
        alert: false,
      });
    }

    const dataSend = {
      _id: eUser._id,
      firstName: eUser.firstName,
      lastName: eUser.lastName,
      email: eUser.email,
      image: eUser.image,
    };

    return res.status(201).json({
      data: dataSend,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error..." });
  }
});

module.exports = router;
