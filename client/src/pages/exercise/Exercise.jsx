import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DisplayExercise = () => {
  const { workoutId } = useParams(); // Assuming workoutId is passed in the URL
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/exercises/${workoutId}`);
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [workoutId]);

  return (
    <div className="container">
      <h1>Exercises for Workout ID: {workoutId}</h1>
      <button onClick={() => navigate(`/add-exercise/${workoutId}`)}>Add Exercise</button>
      <div>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div key={exercise.exercise_id}>
              <h3>{exercise.exercise_name}</h3>
              <p>Duration: {exercise.duration} minutes</p>
              <p>Calories Burned: {exercise.calories_burned} kcal</p>
            </div>
          ))
        ) : (
          <p>No exercises found for this workout.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayExercise;
