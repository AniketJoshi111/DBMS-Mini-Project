const express = require('express');
const router = express.Router();
const connection = require('../models/db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Error retrieving users', details: err });
      return;
    }

    
    if (!Array.isArray(results)) {
      return res.status(500).json({ error: 'Error retrieving users', details: 'Results is not an array' });
    }

    // If 'results' is an array, send it in the response
    res.status(200).json(results);
  });
});


router.post('/', (req, res) => {
  console.log(req.body);
  const { first_name, last_name, dob, age, weight, height, bmi } = req.body;

  if (!first_name || !last_name || !dob || !age || !weight || !height || !bmi) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO Users (First_Name, Last_Name, Date_of_birth, Age, Weight, Height, BMI) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    sql,
    [first_name, last_name, dob, age, weight, height, bmi],
    (err, result) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ error: 'Error adding user', details: err });
      }
      res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    }
  );
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM users WHERE User_Id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: 'Error retrieving user', details: err });
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(results[0]); 
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM users WHERE User_Id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Error deleting user', details: err });
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or already deleted' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'UPDATE users SET first_name = ? WHERE User_Id = ?';
  connection.query(sql, [req.body.first_name, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error updating the user", details: err });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found for updating' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  });
});

router.get('/:id/progress', (req, res) => {
  const userId  = req.params.id;
  const query = `CALL GetUserProgress(?)`;

  connection.query(query, [userId], (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results[0]); // Send the result of the procedure as JSON
  });
});

module.exports = router;