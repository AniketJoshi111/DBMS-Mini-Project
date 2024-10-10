  import  { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  const AddUser = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      dob: '',
      age: '',
      weight: '',
      height: '',
      bmi: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      navigate('/workout');
      try {
        const response = await axios.post('http://localhost:4000/api/users', formData);
        console.log('User added successfully:', response.data);
        setFormData({
          first_name: '',
          last_name: '',
          dob: '',
          age: '',
          weight: '',
          height: '',
          bmi: ''
        });
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} >
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Height (cm):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>BMI:</label>
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    );
  };

  export default AddUser;
