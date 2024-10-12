import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddWorkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workoutName: '',
    date: '',
    duration: '',
    caloriesBurned: '',
  });

  // useEffect to handle side effects (like logging formData)
  useEffect(() => {
    console.log('Form data has changed:', formData);
  }, [formData]); // This will run every time formData changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData);
    
    try {
      const response = await axios.post('http://localhost:4000/api/workout/', formData);
      console.log('Workout added successfully:', response.data);

      setFormData({
        workoutName: '',
        date: '',
        duration: '',
        caloriesBurned: '',
      });
      // Navigate to /workout
      navigate('/workout/1');
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add Workout</h1>
      <form onSubmit={handleSubmit}>
      
        <div>
          <label>Workout name:</label>
          <input
            type="text"
            name="workoutName"
            value={formData.workoutName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Workout:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Calories burned (kcals):</label>
          <input
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add New Workout</button>
      </form>
    </div>
  );
};

export default AddWorkout;
