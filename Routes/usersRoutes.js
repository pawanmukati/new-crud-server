// usersRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// User Schema
const userSchema = new mongoose.Schema({
  first_name: String,
  phone: Number,
  email: String,
  address: String
});

const User = mongoose.model('User', userSchema);

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { first_name, phone, email,address} = req.body;
        const user = new User({ first_name, phone, email,address});
        await user.save();
        res.send(`${first_name} has been added to the Database`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.send(`${id} deleted successfully from database`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

// Update a user by ID
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, phone, email,address } = req.body;
        const user = await User.findByIdAndUpdate(id, { first_name, phone, email,address });
        res.send(`User with the ${id} has been updated`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
