
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to Fitness Tracker</h1>
      <p className="text-lg mb-6 text-gray-700">Track your workouts, progress, and trainer interactions!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <button
          onClick={() => navigate('/workout')}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Workout
        </button>

        <button
          onClick={() => navigate('/trainer')}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
        >
          Trainer
        </button>

        <button
          onClick={() => navigate('/workout/1')}
          className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600"
        >
          Progress
        </button>
      </div>
    </div>
  );
};

export default Homepage;
