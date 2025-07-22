// src/routines/RoutinesPage.jsx
import { useAuth } from "../auth/AuthContext"; // To check if user is logged in

import RoutineList from "./RoutineList"; // Will create this
import RoutineForm from "./RoutineForm"; // Will create this

/**
 * Main page for displaying routines.
 * Shows a list of all routines and a form to create new ones if logged in.
 */
export default function RoutinesPage() {
  const { token } = useAuth(); // Check if user is logged in

  return (
    <>
      <h1>Routines</h1>
      <RoutineList />
      {token && <RoutineForm />} {/* Show form only if user is logged in */}
    </>
  );
}
