const User = require('../model/Users.js');
const bcrypt = require('bcrypt');
const router = require('express').Router(); 

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error", alert: false });
        }
        if (result) {
           
            const checkCorrectPassword = await bcrypt.compare(password, result.password);
            if (!checkCorrectPassword) {
                return res.status(401).json({ message: "Incorrect Password, Try another." });
            }
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image
            };
            console.log(dataSend);
            res.send({ message:"User logged in successfully", alert: true, data: dataSend });
        } else {
            res.send({ message: "The user doesn't exist, Please signup", alert: false });
        }
    });
});

module.exports = router;
