import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  const location = useLocation();

  if (!user) {
    // Login illa → /login ku anuppu, vandha page-ah state la eduthukko
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
