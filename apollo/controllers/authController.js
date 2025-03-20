const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

const authController = {
    register: async (req, res) => {
        try {
            const { username, email, password, accountType } = req.body;

            // check username
            const existingUserByUsername = await models.User.getUserByUsername(username);
            if (existingUserByUsername) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // check email
            const existingUserByEmail = await models.User.getUserByEmail(email);
            if (existingUserByEmail) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // create new user
            const newUser = await models.User.create({ username, email, password: hashedPassword, accountType });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // find user
            const user = await models.User.getUserByEmail(email);
            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // check password
            const isPasswordValid = await bcrypt.compare(password, user.Password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Generate a token if needed
            // const token = jwt.sign({ id: user.UserID, accountType: user.AccountType }, 'your_jwt_secret', { expiresIn: '1h' });

            // send user details on successful login
            res.json({
                message: 'Login successful',
                user: {
                    UserID: user.UserID,
                    username: user.Username,
                    email: user.Email,
                    accountType: user.AccountType,
                    OrganizationID: user.OrganizationID || null  // Ensure this is included
                }
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = authController;
