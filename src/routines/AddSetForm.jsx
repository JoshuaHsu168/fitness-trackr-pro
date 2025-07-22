// src/routines/AddSetForm.jsx
import { useState, useEffect } from "react";
import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

export default function AddSetForm({ routineId, onAddSuccess }) {
  // Fetch all activities to populate the dropdown
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useQuery("/activities");

  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState(""); // <--- NEW STATE FOR DURATION
  const [error, setError] = useState(null);

  // useMutation for adding a set to the routine
  const {
    mutate: addSet,
    loading: addSetLoading,
    error: addSetError,
  } = useMutation("POST", `/routines/${routineId}/activities`, [
    `routineActivities-${routineId}`,
  ]);

  // Set initial selected activity when activities load
  useEffect(() => {
    if (activities && activities.length > 0 && !selectedActivityId) {
      setSelectedActivityId(activities[0].id);
    }
  }, [activities, selectedActivityId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Add validation for duration too
    if (!selectedActivityId || !count || !duration) {
      // <--- ADD DURATION TO VALIDATION
      setError("Please select an activity, enter a count, and a duration.");
      return;
    }

    try {
      // API expects activityId, count, and DURATION in the body
      await addSet({ activityId: selectedActivityId, count, duration }); // <--- ADD DURATION HERE
      // Clear form on success
      setSelectedActivityId(activities[0]?.id || "");
      setCount("");
      setDuration(""); // <--- RESET DURATION STATE
      alert("Set added successfully!");
      onAddSuccess(); // Call the refetch function passed from RoutineDetailsPage
    } catch (e) {
      console.error("Error adding set:", e);
      setError(e.message || "Failed to add set.");
    }
  };

  if (activitiesLoading) return <p>Loading activities for sets...</p>;
  if (activitiesError)
    return <p>Error loading activities: {activitiesError.message}</p>;
  if (!activities || activities.length === 0)
    return <p>No activities available to add.</p>;

  return (
    <>
      <h3>Add a New Set</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Activity:
          <select
            value={selectedActivityId}
            onChange={(e) => setSelectedActivityId(parseInt(e.target.value))}
            required
          >
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Count (Reps/Sets):
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            required
            min="1"
          />
        </label>
        <label>
          Duration (e.g., minutes): {/* <--- NEW INPUT FIELD */}
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            required
            min="1"
          />
        </label>
        <button type="submit" disabled={addSetLoading}>
          {addSetLoading ? "Adding..." : "Add Set"}
        </button>
        {(error || addSetError) && (
          <output style={{ color: "red" }}>{error || addSetError}</output>
        )}
      </form>
    </>
  );
}
