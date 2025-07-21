import Navbar from "./Navbar";
// import { usePage } from "./PageContext"; // DELETE THIS IMPORT if not already removed by previous steps

/** The shared layout for all pages of the app */
export default function Layout({ children }) {
  // const { page } = usePage(); // DELETE THIS LINE if still present
  return (
    <>
      <Navbar />
      <main>{children}</main>{" "}
      {/* children are now provided by React Router's <Outlet> equivalent */}
    </>
  );
}
