const db = require('../models/db');

// Add a new user
const addUser = async (req, res) => {
  const { first_name, last_name, Date_of_birth, age, weight, height, bmi } = req.body;

  try {
    // Insert user data into the database
    const query = `
      INSERT INTO users (first_name, last_name, Date_of_birth, age, weight, height, bmi)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [first_name, last_name, Date_of_birth, age, weight, height, bmi]);

    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding user', details: error.message });
  }
};

// Retrieve all users
const getUsers = async (req, res) => {
  try {
    // Query to get all users from the database
    const q = 'SELECT * FROM users';
    console.log(q);
    const [users] = await req.db.query(q);

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users', details: error.message });
  }
};

// Retrieve user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Query to get a specific user by ID
    const q = 'SELECT * FROM users WHERE User_Id = ?';
    const [user] = await db.query(q, [id]);

    if (user.length > 0) {
      res.status(200).json(user[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user', details: error.message });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Query to delete a user by ID
    const query = 'DELETE FROM users WHERE User_Id = ?';
    const result = await db.query(query, [id]);

    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user', details: error.message });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  deleteUserById
};
