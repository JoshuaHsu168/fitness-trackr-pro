// import { usePage } from "./layout/PageContext"; // DELETE THIS IMPORT

import { Routes, Route } from "react-router-dom"; // IMPORT Routes and Route

import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetailsPage from "./activities/ActivityDetailsPage"; // Will create this soon
import Error404 from "./Error404.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  // const { page } = usePage(); // DELETE THIS LINE

  return (
    <Routes>
      {/* Define the main layout route. All nested routes will render inside <Layout>'s {children} */}
      <Route path="/" element={<ActivitiesPage />} />{" "}
      {/* Default route to activities */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      {/* Route for individual activity details with a dynamic segment ':activityId' */}
      <Route path="/activities/:activityId" element={<ActivityDetailsPage />} />
      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
