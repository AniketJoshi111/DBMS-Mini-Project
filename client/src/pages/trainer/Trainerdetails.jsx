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
  
  return (
    <div className="container mx-auto p-4">
      <h1>Trainers List</h1>

      {trainers.length === 0 ? (
        <p>No trainers available.</p>
      ) : (
        <ul className="space-y-2">
          {trainers.map((trainer) => (
            <li key={trainer._id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{trainer.Name}</h2>
              <p>Salary: {trainer.Salary}</p>
              <p>Membership: {trainer.Membership}</p>  {/* Adjust display based on membership structure */}
              <button onClick={() => handleDeleteTrainer(trainer._id)}>
                Remove Trainer
              </button>
              <button onClick={() => handleSubscription(trainer._id)}>
                Subscribe Trainer
              </button>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default TrainerPage;