// src/routines/RoutineForm.jsx
import { useState } from "react";
import useMutation from "../api/useMutation";

/** Form for logged-in users to create a new routine. */
export default function RoutineForm() {
  // useMutation for POST /routines, invalidating "routines" tag on success
  const {
    mutate: addRoutine,
    loading,
    error,
  } = useMutation("POST", "/routines", ["routines"]);

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Call the mutation function with form data
      await addRoutine({ name, goal });
      // Clear form on success
      setName("");
      setGoal("");
      alert("Routine created successfully!"); // User feedback
    } catch (e) {
      // Error is already set by useMutation, can display it
      console.error("Error creating routine:", e);
    }
  };

  return (
    <>
      <h2>Create New Routine</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Routine Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Goal:
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Routine"}
        </button>
        {error && <output style={{ color: "red" }}>{error}</output>}
      </form>
    </>
  );
}
