const express = require('express');
const router = express.Router();
const connection = require('../models/db'); // Adjust the path to your db.js file

// see all exercise

router.get('/', async (req, res) => {
    const {workoutId} = req.body;
    const query = 'select * from exercisel';

    try {
        await connection.query(query);
        res.status(201).json({ message: 'Exercise displayed successfully' });
    } catch (error) {
        console.error('Error fetching exercise:', error);
        res.status(500).json({ error: 'Error fetching exercise', details: error.message });
    }
});

router.post('/:workout_id', async (req, res) => {
    const { workout_id, exercise_name, duration, calories_burned } = req.body;
    const query = 'INSERT INTO Exercises (workout_id, exercise_name, duration, calories_burned) VALUES (?, ?, ?, ?)';

    try {
        await connection.query(query, [workout_id, exercise_name, duration, calories_burned]);
        res.status(201).json({ message: 'Exercise created successfully' });
    } catch (error) {
        console.error('Error creating exercise:', error);
        res.status(500).json({ error: 'Error creating exercise', details: error.message });
    }
});

// Get all exercises for a workout
router.get('/:workoutId', async (req, res) => {
    const { workoutId } = req.params;
    const query = 'SELECT * FROM Exercises WHERE workout_id = ?';

    try {
        const [rows] = await connection.query(query, [workoutId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error retrieving exercises:', error);
        res.status(500).json({ error: 'Error retrieving exercises', details: error.message });
    }
});

// Get a specific exercise by ID
router.get('/:workoutId/:exerciseId', async (req, res) => {
    const { workoutId, exerciseId } = req.params;
    const query = 'SELECT * FROM Exercises WHERE workout_id = ? AND exercise_id = ?';

    try {
        const [rows] = await connection.query(query, [workoutId, exerciseId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error retrieving exercise:', error);
        res.status(500).json({ error: 'Error retrieving exercise', details: error.message });
    }
});

// Update an exercise by ID
router.put('/:workoutId/:exerciseId', async (req, res) => {
    const { workoutId, exerciseId } = req.params;
    const { exercise_name, duration, calories_burned } = req.body;
    const query = 'UPDATE Exercises SET exercise_name = ?, duration = ?, calories_burned = ? WHERE workout_id = ? AND exercise_id = ?';

    try {
        const result = await connection.query(query, [exercise_name, duration, calories_burned, workoutId, exerciseId]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Exercise not found or not updated' });
        }
        res.status(200).json({ message: 'Exercise updated successfully' });
    } catch (error) {
        console.error('Error updating exercise:', error);
        res.status(500).json({ error: 'Error updating exercise', details: error.message });
    }
});

// Delete an exercise by ID
router.delete('/:workoutId/:exerciseId', async (req, res) => {
    const { workoutId, exerciseId } = req.params;
    const query = 'DELETE FROM Exercises WHERE workout_id = ? AND exercise_id = ?';

    try {
        const result = await connection.query(query, [workoutId, exerciseId]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        console.error('Error deleting exercise:', error);
        res.status(500).json({ error: 'Error deleting exercise', details: error.message });
    }
});

module.exports = router;
