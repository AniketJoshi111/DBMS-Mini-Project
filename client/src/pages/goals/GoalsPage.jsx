import  { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you have the axios setup in this path
import { useNavigate } from 'react-router-dom';

const GoalPage = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost/4000/api/goals/1'); // Adjust the endpoint based on your backend
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Goals</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate('/add-goal')} // Adjust to the correct route for adding a goal
      >
        Add New Goal
      </button>

      {goals.length === 0 ? (
        <p>No goals found. Please add some goals.</p>
      ) : (
        <ul className="list-disc list-inside">
          {goals.map((goal) => (
            <li key={goal.id} className="mb-2">
              <strong>{goal.title}</strong>: {goal.description} (Deadline: {goal.deadline})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalPage;
