import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-badge">404 Error</p>
        <h5>Page Not Found</h5>
        <p className="not-found-message">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="primary-btn">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
