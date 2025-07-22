// src/routines/RoutineList.jsx
import useQuery from "../api/useQuery";
import { Link } from "react-router-dom"; // For linking to individual routine details

/** Shows a list of all routines. */
export default function RoutineList() {
  // Fetch all routines from the API
  const {
    data: routines, // Rename data to routines
    loading,
    error,
  } = useQuery("/routines", "routines"); // Use "routines" tag for invalidation

  if (loading || !routines) return <p>Loading routines...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {routines.map((routine) => (
        // Link to the individual routine details page
        <li key={routine.id}>
          <Link to={`/routines/${routine.id}`}>
            <h3>{routine.name}</h3>
          </Link>
          <p>Goal: {routine.goal}</p>
          <p>Creator: {routine.creatorName}</p>{" "}
          {/* Assuming creatorName is provided by API */}
        </li>
      ))}
    </ul>
  );
}
