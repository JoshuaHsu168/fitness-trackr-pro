import { useState } from "react";
import { useAuth } from "./AuthContext";
// import { usePage } from "../layout/PageContext"; // DELETE THIS IMPORT
import { Link, useNavigate } from "react-router-dom"; // IMPORT Link and useNavigate

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  // const { setPage } = usePage(); // DELETE THIS LINE
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/activities"); // Navigate to activities page on success
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <output>{error}</output>}
      </form>
      {/* Use Link component for navigation */}
      <Link to="/login">Already have an account? Log in here.</Link>
    </>
  );
}
