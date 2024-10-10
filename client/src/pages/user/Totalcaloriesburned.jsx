import  { useState } from 'react';
import axios from 'axios'; // Make sure to import your axios instance

const TotalCaloriesBurned = () => {
  const [totalCalories, setTotalCalories] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchTotalCalories = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/workout/calories-burned/1`);
      setTotalCalories(response.data.totalCalories);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching total calories:', err.response?.data || err.message);
      setError('Error fetching total calories');
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <button 
        onClick={fetchTotalCalories} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Show Total Calories Burned
      </button>
      {totalCalories !== null && (
        <p className="mt-2 text-lg">
          Total Calories Burned: {totalCalories}
        </p>
      )}
      {error && (
        <p className="mt-2 text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TotalCaloriesBurned;
