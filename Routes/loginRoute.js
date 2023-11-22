const User = require('../model/Users.js');
const bcrypt = require('bcrypt');
const router = require('express').Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const eUser = await User.findOne({ email: email });

        if (!eUser) {
            return res.status(404).json({ message: "The user doesn't exist. Please sign up", alert: false });
        }

        if (!(await bcrypt.compare(password, eUser.password))) {
            return res.status(403).json({ message: 'Incorrect password. Try another...' });
        }

        const dataSend = {
            _id: eUser._id,
            firstName: eUser.firstName,
            lastName: eUser.lastName,
            email: eUser.email,
            image: eUser.image
        };

        res.status(200).json({
            message: `User with email ${email} logged in successfully`,
            data: dataSend,
            alert: true
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: 'Internal server error...', alert: false });
    }
});

module.exports = router;
