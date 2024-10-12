import  { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddExercise = () => {
  const navigate = useNavigate();
  const { workoutId } = useParams(); // Assuming workoutId is passed in the URL

  const [formData, setFormData] = useState({
    exercise_name: '',
    duration: '',
    calories_burned: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/exercise/1`, formData);
      console.log('Exercise added successfully:', response.data);
      setFormData({
        exercise_name: '',
        duration: '',
        calories_burned: '',
      });
      navigate(`/exercises/1`); // Redirect to the Display Exercise page
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add Exercise</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exercise Name:</label>
          <input
            type="text"
            name="exercise_name"
            value={formData.exercise_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Calories Burned:</label>
          <input
            type="number"
            name="calories_burned"
            value={formData.calories_burned}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
};

export default AddExercise;
