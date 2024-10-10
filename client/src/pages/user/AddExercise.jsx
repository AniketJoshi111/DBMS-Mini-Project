import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming axios is set up

const AddExercisePage = () => {
  
  const [exerciseData, setExerciseData] = useState({
    exercise_name: '',
    sets: '',
    reps: '',
    duration: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/workout/1/exercises`, exerciseData);
      console.log('Exercise added:', response.data);
      navigate(`/workout`); // Redirect back to workout page
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  return (
    <div>
      <h1>Add Exercise to Workout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exercise Name:</label>
          <input
            type="text"
            name="exercise_name"
            value={exerciseData.exercise_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sets:</label>
          <input
            type="number"
            name="sets"
            value={exerciseData.sets}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            name="reps"
            value={exerciseData.reps}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Duration (in minutes):</label>
          <input
            type="number"
            name="duration"
            value={exerciseData.duration}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
};

export default AddExercisePage;
