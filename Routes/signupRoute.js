const User = require('../model/Users.js');
const bcrypt = require('bcrypt');
const router = require('express').Router(); 

router.post("/", async (req, res) => {
    console.log(req.body)
  try {
    const { email, password,  confirmPassword } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send({ message: 'Email id is already registered', alert: false });
    } else if (password !==  confirmPassword) {
        // Password and confirmPassword do not match
        res.status(400).json({
            success: false,
            message: 'Password and confirmPassword do not match',
          });
      } else {
        // HASHING PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: email,
          password: hash,
          confirmPassword: hash, // Store hashed password in confirmPassword (or omit it)
          image: req.body.image,
        });
         await newUser.save();

        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            alert: true
          });
      }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to register the user, Try again',
    });
  }
});

module.exports = router;
