import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./pages/user/Adduser";

import WorkoutsPage from "./components/WorkoutPage";
import AddWorkout from "./pages/user/Addworkout";
import TrainerPage from "./pages/trainer/Trainerdetails";
import ProgressChart from "./components/UserProgesschart";
import Homepage from "./pages/user/Home";
import AddExercisePage from "./pages/user/AddExercise";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/workout/:id" element={<ProgressChart/>}/>
          <Route path="/workout" element={<WorkoutsPage/>}/>
          <Route path="/workout/add" element={<AddWorkout/>}/>
          <Route path="/trainer" element={<TrainerPage/>}/>
          <Route path="/add-exercise/:workoutid" element={<AddExercisePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
