--  database name : fts
use fts;


CREATE TABLE Users (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Date_of_birth DATE,
    Age INT,
    Weight DECIMAL(5, 2),
    Height DECIMAL(5, 2),
    BMI DECIMAL(5, 2)
);

CREATE TABLE Trainers(
    Trainer_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Salary DECIMAL(10, 2),
    Membership VARCHAR(50)
);  

CREATE TABLE Workouts (
    Workout_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Trainer_ID INT,
    Workout_name VARCHAR(100),
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
    FOREIGN KEY (Trainer_ID) REFERENCES Trainers(Trainer_ID)
);

CREATE TABLE Exercises (
    Exercise_ID INT AUTO_INCREMENT PRIMARY KEY,
    Exercise_name VARCHAR(100),
    Sets INT,
    Repetitions INT
);

CREATE TABLE Workout_Exercises (
    Workout_ID INT,
    Exercise_ID INT,
    Sets INT,
    Repetitions INT,
    PRIMARY KEY (Workout_ID, Exercise_ID),
    FOREIGN KEY (Workout_ID) REFERENCES Workouts(Workout_ID),
    FOREIGN KEY (Exercise_ID) REFERENCES Exercises(Exercise_ID)
);

CREATE TABLE Goals (
    Goal_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Goal_name VARCHAR(100),
    Time_Bound BOOLEAN,
    User_specific BOOLEAN,
    System_Suggested BOOLEAN,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
);



-- statement for listing the total procedures in database
SHOW PROCEDURE STATUS WHERE Db = 'your_database_name';

--logging the workout
DELIMITER $$
CREATE PROCEDURE LogWorkout (
    IN p_user_id INT,
    IN p_exercise_id INT,
    IN p_reps INT,
    IN p_sets INT,
    IN p_duration TIME,
    IN p_date DATE
)
BEGIN
    INSERT INTO workouts (user_id, exercise_id, reps, sets, duration, workout_date)
    VALUES (p_user_id, p_exercise_id, p_reps, p_sets, p_duration, p_date);
END $$
DELIMITER ;

--set user goal
DELIMITER $$
CREATE PROCEDURE SetUserGoal (
    IN p_user_id INT,
    IN p_goal_type VARCHAR(255),
    IN p_target_value DECIMAL(10, 2),
    IN p_target_date DATE
)
BEGIN
    INSERT INTO goals (user_id, goal_type, target_value, target_date, created_at)
    VALUES (p_user_id, p_goal_type, p_target_value, p_target_date, NOW());
END $$
DELIMITER ;


--add new exercise
DELIMITER $$
CREATE PROCEDURE AddExercise (
    IN p_name VARCHAR(255),
    IN p_muscle_group VARCHAR(255),
    IN p_difficulty_level VARCHAR(255),
    IN p_equipment_required VARCHAR(255)
)
BEGIN
    INSERT INTO exercises (name, muscle_group, difficulty_level, equipment_required)
    VALUES (p_name, p_muscle_group, p_difficulty_level, p_equipment_required);
END $$
DELIMITER ;


--get user progress

DELIMITER //
CREATE PROCEDURE GetUserProgress(
    IN p_user_id int,
    in p_goal_type VARCHAR(50)
)
BEGIN 
SELECT progress_value,progress_date
from user_progress 
where user_id = p_user_id
and goal_type


CREATE PROCEDURE CalculateTotalCaloriesBurned(
    IN userId INT,
    IN startDate DATE,
    IN endDate DATE,
    OUT totalCalories DECIMAL(10, 2)
)
BEGIN
    SELECT SUM(Calories_Burned) INTO totalCalories
    FROM Workouts
    WHERE User_ID = userId AND Date BETWEEN startDate AND endDate;
END;


CREATE PROCEDURE RecordNewWorkout(
    IN userId INT,
    IN workoutDate DATE,
    IN duration INT,
    IN caloriesBurned DECIMAL(10, 2)
)
BEGIN
    INSERT INTO Workouts (User_ID, Date, Duration, Calories_Burned)
    VALUES (userId, workoutDate, duration, caloriesBurned);
END;



--        primary key | foreign key
-- Users :    UserId  | -     
-- Trainer:  TrainerId| -
--Workouts:Workout_Id | User_ID,Trainer_ID 
--Exercises:Exercise_ID| -
--Workout_Exercises:(Workout_ID,Exercise_ID) composite primary key | Workout_ID,Exercise_ID
--Goals : Goal_Key    | User_Id