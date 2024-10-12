import { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/workout`); // Adjust the URL as necessary
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDelete = async (workoutId) => { // Pass workout ID as an argument
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await axios.delete(`http://localhost:4000/api/workout/${workoutId}`); // Adjust the URL as necessary
        const updatedWorkouts = workouts.filter((workout) => workout.Workout_ID !== workoutId);
        setWorkouts(updatedWorkouts);
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  const handleAddExercise = (workoutId)=>{
    navigate(`/add-exercise/${workoutId}`);
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Workouts List</h1>

      {workouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <ul className="space-y-2">
        {workouts.map((workout) => (
            <li key={workout.Workout_ID} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{workout.Workout_name}</h2>
              <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
              <p>Duration: {workout.Duration} minutes</p>
              <p>Calories Burned: {workout.Calories_burned} kcal</p>
              <button onClick={() => handleDelete(workout.Workout_ID)}>
                Remove workout
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/workout/add')}>Add workout</button>
    </div>
  );
};

export default WorkoutsPage;