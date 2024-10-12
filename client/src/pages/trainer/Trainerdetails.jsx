import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainerPage = () => {
  const [trainers, setTrainers] = useState([]); // State to store trainer data
  const navigate = useNavigate();

  // Fetch trainers on component mount
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/trainer'); // Adjust URL as needed
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  const handleDeleteTrainer = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/trainer/${id}`); // API call to delete trainer
      setTrainers(trainers.filter(trainer => trainer._id !== id)); // Remove trainer from state
      alert('Trainer deleted successfully!');
    } catch (error) {
      console.error('Error deleting trainer:', error);
      alert('Failed to delete trainer');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Trainers List</h1>

      {trainers.length === 0 ? (
        <p>No trainers available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Tailwind Grid for layout */}
          {trainers.map((trainer) => (
            <div key={trainer._id} className="bg-white border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-2">{trainer.Name}</h2>
              <p className="text-lg mb-2">Salary: {trainer.Salary}</p>
              <p className="text-lg mb-4">Membership: {trainer.Membership}</p> 
              <button
                onClick={() => handleDeleteTrainer(trainer._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete Trainer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerPage;
