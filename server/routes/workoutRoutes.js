const express = require('express');
const router = express.Router();
const connection = require('../models/db'); // Assuming you have your MySQL connection in db.js

// CREATE a workout (POST /workouts)
router.post('/', (req, res) => {
    const { User_ID, workoutName, date, duration, caloriesBurned } = req.body;
    const query = 'INSERT INTO Workouts (User_ID, Workout_Name, Date, Duration, Calories_Burned) VALUES (?, ?, ?, ?, ?)';
    
    connection.query(query, [User_ID, workoutName, date, duration, caloriesBurned], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: 'Workout added successfully!', workoutId: result.insertId });
    });
});

// READ all workouts (GET /workouts)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Workouts';
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
});

router.get('/:id', (req, res) => {
    const workoutId = req.params.id;
    const query = 'SELECT * FROM Workouts WHERE Workout_ID = ?';
    
    connection.query(query, [workoutId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        res.status(200).json(result[0]);
    });
});


router.put('/:id', (req, res) => {
    const workoutId = req.params.id;
    const { workoutName, date, duration, caloriesBurned } = req.body;
    const query = 'UPDATE Workouts SET Workout_Name = ?, Date = ?, Duration = ?, Calories_Burned = ? WHERE Workout_ID = ?';
    
    connection.query(query, [workoutName, date, duration, caloriesBurned, workoutId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        res.status(200).send({ message: 'Workout updated successfully' });
    });
});


router.delete('/:id', (req, res) => {
    const workoutId = req.params.id;
    const query = 'DELETE FROM Workouts WHERE Workout_ID = ?';
    
    connection.query(query, [workoutId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        res.status(200).send({ message: 'Workout deleted successfully' });
    });
});

 
router.get('/calories-burned/:userId', async (req, res) => {
    const userId = req.params.userId;
    
    // Query to calculate total calories burned
    const query = `
        SELECT SUM(calories_burned) AS totalCalories
        FROM workouts
        WHERE user_id = ?;
    `;
    
    req.db.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error retrieving calories burned',
                details: error.message
            });
        }
        
        const totalCalories = results[0]?.totalCalories || 0; // Default to 0 if no records
        res.json({ userId, totalCalories });
    });
});
router.get('/avgcalories-burned/:userId', async (req, res) => {
    const userId = req.params.userId;
    
    // Query to calculate total calories burned
    const query = `
        SELECT AVG(calories_burned) AS AverageCalories
        FROM workouts
        WHERE user_id = ?;
    `;
    
    req.db.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error retrieving calories burned',
                details: error.message
            });
        }
        
        const AverageCalories = results[0]?.AverageCalories || 0; // Default to 0 if no records
        res.json({ userId, AverageCalories });
    });
});


router.get('/:id/exercises', (req, res) => {
    const workoutId = req.params.id;
  
    const query = `SELECT * FROM exercises WHERE workout_id = ?`;
    req.db.query(query, [workoutId], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching exercises', details: err });
      } else {
        res.json(results);
      }
    });
  });
  
  router.post('/:id/exercises', (req, res) => {
    const workoutId = req.params.id;
    const { exercise_name, duration, calories_burned } = req.body;
  
    const query = `INSERT INTO exercises (exercise_name, duration, calories_burned, workout_id) VALUES (?, ?, ?, ?)`;
    req.db.query(query, [exercise_name, duration, calories_burned, workoutId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error adding exercise', details: err });
      } else {
        res.json({ message: 'Exercise added successfully', exerciseId: result.insertId });
      }
    });
  });

module.exports = router;
