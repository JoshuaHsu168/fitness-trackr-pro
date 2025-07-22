// src/routines/RoutineDetailsPage.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

import AddSetForm from "./AddSetForm";
import SetDeleteButton from "./SetDeleteButton";

export default function RoutineDetailsPage() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    data: routine,
    loading,
    error,
    query: refetchRoutine,
  } = useQuery(`/routines/${routineId}`, `routineActivities-${routineId}`);

  const {
    mutate: deleteRoutine,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${routineId}`, ["routines"]);

  const handleDeleteRoutine = async () => {
    if (window.confirm("Are you sure you want to delete this routine?")) {
      await deleteRoutine();
      if (!deleteError) {
        alert("Routine deleted successfully!");
        navigate("/routines");
      }
    }
  };

  if (loading) return <p>Loading routine details...</p>;
  if (error) return <p>Error loading routine: {error}</p>;
  if (!routine) return <p>Routine not found.</p>;

  // Change from routine.activities to routine.sets
  const hasSets = routine.sets && routine.sets.length > 0;

  return (
    <div>
      <h1>{routine.name}</h1>
      <p>
        <strong>Goal:</strong> {routine.goal}
      </p>
      <p>
        <strong>Created by:</strong> {routine.creatorName}
      </p>

      {token && (
        <button onClick={handleDeleteRoutine} disabled={deleteLoading}>
          {deleteLoading ? "Deleting..." : "Delete Routine"}
        </button>
      )}
      {deleteError && <output style={{ color: "red" }}>{deleteError}</output>}

      <hr />

      <h2>Sets for this Routine</h2>
      {hasSets ? (
        <ul>
          {/* Change from routine.activities.map to routine.sets.map */}
          {routine.sets.map(
            (
              set // Renamed 'activity' to 'set' for clarity here
            ) => (
              <li key={set.id}>
                {" "}
                {/* The 'id' property of the set object is the routineActivityId for deletion */}
                <p>
                  <strong>{set.name}</strong> - Count: {set.count} - Duration:{" "}
                  {set.duration}
                </p>
                {token && (
                  <SetDeleteButton
                    routineId={routineId}
                    routineActivityId={set.id} // Use set.id as routineActivityId
                    onDeleteSuccess={refetchRoutine}
                  />
                )}
              </li>
            )
          )}
        </ul>
      ) : (
        <p>This routine has no sets. {token && "Add one below!"}</p>
      )}

      {token && (
        <AddSetForm routineId={routineId} onAddSuccess={refetchRoutine} />
      )}

      <p>
        <Link to="/routines">Back to all routines</Link>
      </p>
    </div>
  );
}
