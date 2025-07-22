import { useAuth } from "../auth/AuthContext";
// import { usePage } from "./PageContext"; // DELETE THIS IMPORT
import { Link, useNavigate } from "react-router-dom"; // IMPORT Link and useNavigate

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <Link to="/activities">Activities</Link>
        <Link to="/routines">Routines</Link> {/* Add this link */}
        {token ? (
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
