const express = require("express");
const router = express.Router();
const connection = require('../models/db');

//getallgoals
router.get("/", (req, res) => {
  const sql = "Select * from goals";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving goals", err);
      res.status(500).json({ error: "Error retrieving goals", details: err });
      return;
    }
    if (!Array.isArray(results)) {
      return res
        .status(500)
        .json({
          error: "Error retrieving goals",
          details: "Results is not an array",
        });
    }

    
    res.status(200).json(results);
  });
});


//getuserbyId
router.get("/:id", (req, res) => {
  const goalId = req.params.id;
    const sql = "Select * from goals where Goal_Id=?";
  
    connection.query(sql,[goalId], (err, results) => {
      if (err) {
        console.error("Error retrieving goal", err);
        res.status(500).json({ error: "Error retrieving goal", details: err });
        return;
      }
      if (results.length===0) {
        return res
          .status(404)
          .json({
            message:'Goal not found'
          });
      }
      res.status(200).json(results[0]);
    });
  });
router.post('/', async (req, res) => {
    const { user_id, goal_type, target, deadline } = req.body;
  
    const query = 'INSERT INTO Goals (user_id, goal_type, target, deadline) VALUES (?, ?, ?, ?)';
    
    try {
      const [result] = await req.db.execute(query, [user_id, goal_type, target, deadline]);
      res.status(201).json({ message: 'Goal set successfully', goalId: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error setting goal', details: error.message });
    }
  });
  // goals
  router.delete('/:id', (req, res) => {
    const goalId = req.params.id;
  
    const sql = 'DELETE FROM goals WHERE Goal_ID = ?';
    connection.query(sql, [goalId], (err, result) => {
      if (err) {
        console.error('Error deleting goal:', err);
        res.status(500).json({ error: 'Error deleting goal', details: err });
        return;
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Goal not found or already deleted' });
      }
  
      res.status(200).json({ message: 'Goal deleted successfully' });
    });
  });
module.exports = router;