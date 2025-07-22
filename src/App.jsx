// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetailsPage from "./activities/ActivityDetailsPage";
import RoutinesPage from "./routines/RoutinesPage";
import RoutineDetailsPage from "./routines/RoutineDetailsPage";
import Error404 from "./Error404.jsx";

export default function App() {
  return (
    <Routes>
      {/*
        The default route. When the path is exactly "/", it renders ActivitiesPage.
        You can remove the duplicate /activities route if you want / to be the only path to it.
      */}
      <Route path="/" element={<ActivitiesPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/:activityId" element={<ActivityDetailsPage />} />
      {/* Correct Routines routes */}
      <Route path="/routines" element={<RoutinesPage />} />
      <Route path="/routines/:routineId" element={<RoutineDetailsPage />} />
      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
