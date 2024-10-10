const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db'); // Import the database connection
const userRoutes = require('./routes/userRoutes'); // Import user routes
const cors = require('cors');
const goalRoutes = require('./routes/goalRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const app = express();
const port = 4000;


app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//db middleware 
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/goals',goalRoutes);
app.use('/api/workout',workoutRoutes);
app.use('/api/trainer',trainerRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
