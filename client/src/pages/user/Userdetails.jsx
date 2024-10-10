/* eslint-disable react/prop-types */
import ProgressChart from '../../components/UserProgesschart';
// import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
function UserDetails() {
  const id = 1;
  return (
    <div>
      <ProgressChart userId={id} />
    </div>
  );
}

export default UserDetails;