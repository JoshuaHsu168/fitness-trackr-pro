import useMutation from "../api/useMutation";

export default function SetDeleteButton({
  routineId,
  routineActivityId,
  onDeleteSuccess,
}) {
  const {
    mutate: deleteSet,
    loading,
    error,
  } = useMutation("DELETE", `/routine_activities/${routineActivityId}`, [
    `routineActivities-${routineId}`,
  ]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to remove this set from the routine?"
      )
    ) {
      await deleteSet();
      if (!error) {
        alert("Set removed successfully!");
        onDeleteSuccess();
      }
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Removing..." : error ? `Error: ${error}` : "Remove Set"}
    </button>
  );
}
