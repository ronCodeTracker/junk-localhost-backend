const express = require('express');
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const bodyParser = require('body-parser');
const router = express.Router();
const User = require("../models/users"); // Assuming a User model exists
const jwt = require("jsonwebtoken"); // Library for generating JWT tokens
require("dotenv").config(); // Load environment variables

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Function to hash the password
function hashUserPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

// POST: Register a new user
router.post('/register', async (req, res) => {
    console.log("Started user registration route");
    console.log("reqBody: ", req.body); // Debug log
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const passwordDigest = hashUserPassword(password); // Hash the password
        const objectUser = { firstName, lastName, email, passwordDigest }; // Create user object

        const newUser = await User.create(objectUser); // Save to MongoDB
        console.log("User created:", newUser); // Log the result
        return res.status(201).json(newUser); // Return the result in JSON
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// POST: Login a user
router.post('/login', (req, res) => {
    const email = req.body.email; // Save email from request body
    const password = req.body.password; // Save password from request body

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ error: "Could not find account with given email address" });
        }

        // Compare the provided password with the stored passwordDigest
        bcrypt.compare(password, user.passwordDigest).then(success => {
            if (success) {
                const payload = {
                    id: user.id,
                    email: user.email
                };

                // Sign the JWT token
                jwt.sign(payload, process.env.secretOrKey, { expiresIn: 86400 }, (err, token) => {
                    if (err) {
                        return res.status(500).json({ error: "Error generating token" });
                    }
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            } else {
                return res.status(400).json({ error: "Password is incorrect" });
            }
        }).catch(err => res.status(500).json({ error: "Internal server error" }));
    }).catch(err => res.status(500).json({ error: "Internal server error" }));
});

// GET: Fetch all users (Restricted/Debug)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Return the users in JSON format
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;






