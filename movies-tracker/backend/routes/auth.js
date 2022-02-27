const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/isAuth')

const User = require('../models/User');

require('dotenv').config();

router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User ({
        email: email,
        password: encryptedPassword
    });
    await newUser.save();
    const payload = {
        id: newUser._id,
    };
    jwt.sign(
        payload,
        process.env.jwtSecret,
        {
            expiresIn: 3600,
        },
        (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, user: {
                id: newUser.id,
              } });
        }
    );
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
        const payload = {
            id: user._id,
        };
        jwt.sign(
            payload,
            process.env.jwtSecret,
            {
                expiresIn: 3600,
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, user: {
                    id: user.id,
                  } });
            }
        );
    } else {
        return res.status(401).json({ msg: "Password incorrect" });
    }
})

router.get('/user', isAuth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ msg: 'No user found' });
    }
    res.status(200).json({ user })
})

module.exports = router;