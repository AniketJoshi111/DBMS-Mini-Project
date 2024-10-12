const express = require("express");
const router = express.Router();
const connection = require('../models/db');


//get all trainers
router.get('/',(req,res)=>{
    const sql = 'SELECT * from Trainers';

    connection.query(sql,(err,results)=>{
        if(err)
        {
            console.error("Error Retrieving trainer" , err);
            res.status(500).json({error:"Error retrieving trainer details"  ,details: err});
            return ;
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


//get trainer by ID
router.get('/:id',(req,res)=>{
    const trainerId = req.params.id;
    const sql = 'SELECT * from Trainers where Trainer_ID=?';

    connection.query(sql,[trainerId],(err,results)=>{
        if(err)
        {
            console.error("Error Retrieving trainer" , err);
            res.status(500).json({error:"Error retrieving trainer details"  ,details: err});
            return ;
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

router.delete('/:id',(req,res)=>{
    const trainerId = req.params.id;
    const sql = ' DELETE from Trainers where Trainer_ID=?';

    connection.query(sql,[trainerId],(err,results)=>{
        if(err)
        {
            console.error("Error Retrieving trainer" , err);
            res.status(500).json({error:"Error retrieving trainer details"  ,details: err});
            return ;
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
      
          res.status(200).json({message:"Trainer deleted successfully"});
    });
});

router.delete('/:id', async (req, res) => {
    const trainerId = req.params.id;
  
    try {
      // Check if trainer exists
      const [trainer] = await db.query('SELECT * FROM Trainer WHERE id = ?', [trainerId]);
      if (trainer.length === 0) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
  
      // Delete the trainer from the database
      await db.query('DELETE FROM Trainer WHERE id = ?', [trainerId]);
  
      res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
      console.error('Error deleting trainer:', error);
      res.status(500).json({ error: 'Error deleting trainer', details: error.message });
    }
  });
  

module.exports = router;