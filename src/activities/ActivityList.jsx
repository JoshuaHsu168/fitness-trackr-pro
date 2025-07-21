import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
// import useMutation from "../api/useMutation"; // DELETE THIS IMPORT (no longer deleting from here)
import { Link } from "react-router-dom"; // IMPORT Link

/** Shows a list of activities. */
export default function ActivityList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

/** Shows a single activity. Now links to its detail page. */
function ActivityListItem({ activity }) {
  // const { token } = useAuth(); // No longer needed here
  // const {
  //   mutate: deleteActivity,
  //   loading,
  //   error,
  // } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]); // DELETE THIS MUTATION

  return (
    <li>
      {/* Link to the individual activity details page */}
      <Link to={`/activities/${activity.id}`}>
        <p>{activity.name}</p>
      </Link>
      <p>{activity.description}</p> {/* Add description here for visibility */}
      {/* REMOVE THE DELETE BUTTON FROM HERE */}
      {/* {token && (
        <button onClick={() => deleteActivity()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )} */}
    </li>
  );
}
