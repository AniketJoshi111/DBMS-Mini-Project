const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Adjust the path to your db.js file



router.get('/', async (req, res) => {
    try {
      // Run the query and destructure the results
      const [results] = await db.query('SELECT * FROM Goal');  
      
      // Send the results as JSON
      res.json(results); 
    } catch (error) {
      console.error('Error retrieving goals:', error);
      // Return an error response if there's an issue
      res.status(500).json({ error: 'Error retrieving goals', details: error.message });
    }
  });
  
// Create a new goal
router.post('/1', async (req, res) => {
    const { user_id, goal_type, target_value, deadline } = req.body;
    const query = 'INSERT INTO Goal(user_id, goal_type, target_value, deadline) VALUES (?, ?, ?, ?)';

    try {
        await db.query(query, [user_id, goal_type, target_value, deadline]);
        res.status(201).json({ message: 'Goal created successfully' });
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ error: 'Error creating goal', details: error.message });
    }
});

// Get all goals for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params.id;
    const query = 'SELECT * FROM Goal WHERE user_id = ?';

    try {
        const [rows] = await db.query(query, [userId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error retrieving goals:', error);
        res.status(500).json({ error: 'Error retrieving goals', details: error.message });
    }
});

// Get a specific goal by ID
router.get('/:userId/:goalId', async (req, res) => {
    const { userId, goalId } = req.params;
    const query = 'SELECT * FROM Goal WHERE user_id = ? AND goal_id = ?';

    try {
        const [rows] = await db.query(query, [userId, goalId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error retrieving goal:', error);
        res.status(500).json({ error: 'Error retrieving goal', details: error.message });
    }
});


// Delete a goal by ID
router.delete('/:userId/:goalId', async (req, res) => {
    const { userId, goalId } = req.params;
    const query = 'DELETE FROM Goal WHERE user_id = ? AND goal_id = ?';

    try {
        const result = await db.query(query, [userId, goalId]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ error: 'Error deleting goal', details: error.message });
    }
});

module.exports = router;
