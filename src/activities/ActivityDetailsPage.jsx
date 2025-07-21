// src/activities/ActivityDetailsPage.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

/** Page to display details about a single activity. */
export default function ActivityDetailsPage() {
  const { activityId } = useParams(); // Get the activity ID from the URL
  const navigate = useNavigate();
  const { token } = useAuth();

  // Fetch single activity details using useQuery
  // The resource path is dynamic using activityId
  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${activityId}`); // No tag needed here, as we won't invalidate this specific query frequently

  // Set up mutation for deleting the activity
  const {
    mutate: deleteActivity,
    loading: deleteLoading, // Rename loading to avoid conflict
    error: deleteError, // Rename error to avoid conflict
  } = useMutation("DELETE", `/activities/${activityId}`, ["activities"]); // Invalidate "activities" tag on delete

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      await deleteActivity();
      if (!deleteError) {
        // Only navigate if deletion was successful
        alert("Activity deleted successfully!");
        navigate("/activities"); // Redirect to the activities list after deletion
      }
    }
  };

  if (loading) return <p>Loading activity details...</p>;
  if (error) return <p>Error loading activity: {error}</p>;
  if (!activity) return <p>Activity not found.</p>;

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>
        <strong>Description:</strong> {activity.description}
      </p>
      {/* Assuming the API provides creator information, e.g., activity.creatorName */}
      {activity.creatorName && (
        <p>
          <strong>Created by:</strong> {activity.creatorName}
        </p>
      )}
      {/* Display delete button only for logged-in users */}
      {token && (
        <button onClick={handleDelete} disabled={deleteLoading}>
          {deleteLoading
            ? "Deleting..."
            : deleteError
            ? `Error: ${deleteError}`
            : "Delete Activity"}
        </button>
      )}
      <p>
        <Link to="/activities">Back to all activities</Link>
      </p>
    </div>
  );
}
