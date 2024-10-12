import  { useState } from 'react';
import axios from 'axios'; // Assuming you have the axios setup in this path
import { useNavigate } from 'react-router-dom';

const AddGoal = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost/4000/api/goals', formData); // Adjust the endpoint based on your backend
      console.log('Goal added successfully:', response.data);
      navigate('/goals'); // Redirect to the Goals page after successful addition
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Goal</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Goal Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default AddGoal;
