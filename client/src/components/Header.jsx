import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/trainers">Trainers</Link>
          </li>
          <li>
            <Link to="/workouts">Workouts</Link>
          </li>
          <li>
            <Link to="/exercises">Exercises</Link>
          </li>
        </ul>
      </nav>
  );
};

export default Header;