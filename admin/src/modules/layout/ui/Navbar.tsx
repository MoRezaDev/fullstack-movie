import { useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();

  return (
    <div>
      <h1>{location.pathname.slice(1)}</h1>
      <p>Current path: {location.pathname}</p>
    </div>
  );
}
