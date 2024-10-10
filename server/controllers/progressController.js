
const getUserProgress = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const query = `
        SELECT date, weight, calories_burned
        FROM Workout
        WHERE user_id = ?
        ORDER BY date ASC
      `;
      const [progress] = await db.query(query, [user_id]);
  
      if (progress.length > 0) {
        res.status(200).json({ progress });
      } else {
        res.status(404).json({ message: "No progress data found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching progress", details: error });
    }
  };
  
  module.exports = { getUserProgress };
  