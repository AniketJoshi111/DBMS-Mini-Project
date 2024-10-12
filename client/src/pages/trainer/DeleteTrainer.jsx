import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch trainers on component mount
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/trainer'); // Adjust API URL if needed
        setTrainers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError('Error fetching trainers');
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Function to delete trainer by ID
  const handleDeleteTrainer = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/trainer/${id}`); // API call to delete trainer
      setTrainers(trainers.filter(trainer => trainer.id !== id)); // Remove trainer from state
      alert('Trainer deleted successfully!');
    } catch (error) {
      console.error('Error deleting trainer:', error);
      alert('Failed to delete trainer');
    }
  };

  if (loading) {
    return <p>Loading trainers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Delete Trainer</h1>
      <ul>
        {trainers.map(trainer => (
          <li key={trainer.id}>
            {trainer.name} (ID: {trainer.id})
            <button onClick={() => handleDeleteTrainer(trainer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteTrainer;
