import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./pages/user/Adduser";

import WorkoutsPage from "./pages/workout/WorkoutPage";
import AddWorkout from "./pages/workout/Addworkout";
import TrainerPage from "./pages/trainer/Trainerdetails";
import ProgressChart from "./components/UserProgesschart";
import Homepage from "./pages/user/Home";
import AddExercisePage from "./pages/exercise/AddExercise";
import GoalsPage from "./pages/goals/GoalsPage";
import DisplayExercise from "./pages/exercise/Exercise";
import AddGoal from "./components/AddGoal";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/workout/progress/:id" element={<ProgressChart/>}/>
          <Route path="/workout/:id" element={<WorkoutsPage workoutId={1}/>}/>
          <Route path="/workout/add" element={<AddWorkout/>}/>
          <Route path="/trainer" element={<TrainerPage/>}/>
          <Route path="/add-exercise/:workoutid" element={<AddExercisePage workoutId={1}/>}/>
          <Route path="/exercises/:workoutId" element={<DisplayExercise workoutId={1}/>} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/add-goal" element={<AddGoal/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
