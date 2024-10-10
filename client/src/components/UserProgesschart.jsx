import  { useState, useEffect } from "react";
import axios from "axios";
import TotalCaloriesBurned from "../pages/user/Totalcaloriesburned";
import AvgCal from "../pages/user/AvgCal";

// import { useParams } from 'react-router-dom';

const ProgressChart = () => {
  const [progressData, setProgressData] = useState([]);
  // const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/1/progress`
        );
        const data = response.data; // Assuming your API returns progress data
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchData();
  }, []); // Re-run useEffect on userId change

  return (
    <div>
      <h2>User Progress Table</h2>
      {progressData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Duration</th>{"    "}
              <th>Calories_Burned</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((item) => (
              <tr key={item.Date}>
                <td>{new Date(item.Date).toLocaleDateString()}</td>{" "}
                <td>{item.Duration}</td>{" "}
                <td>{item.Calories_Burned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No progress data available.</p>
      )}
      <div className="p-4">
      <TotalCaloriesBurned userId={1} />
    </div>
    <div className="p-4">
      <AvgCal userId={1} />
    </div>
    </div>
  );
};

export default ProgressChart;
