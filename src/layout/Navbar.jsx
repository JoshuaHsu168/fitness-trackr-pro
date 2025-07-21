import { useAuth } from "../auth/AuthContext";
// import { usePage } from "./PageContext"; // DELETE THIS IMPORT
import { Link, useNavigate } from "react-router-dom"; // IMPORT Link and useNavigate

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  // const { setPage } = usePage(); // DELETE THIS LINE
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    logout();
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        {/* Use Link component for navigation */}
        <Link to="/activities">Activities</Link>
        {token ? (
          // Call handleLogout for logout button
          <a onClick={handleLogout}>Log out</a>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
