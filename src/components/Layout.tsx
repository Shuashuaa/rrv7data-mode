import { Outlet, Link } from "react-router";

export default function Layout() {
  return (
    <div>
      <nav className="p-4 border-b">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
} 