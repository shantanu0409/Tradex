import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container py-5 my-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div
            className="display-1 fw-bold text-primary mb-3"
          >
            404
          </div>

          <h2 className="fw-bold mb-3">
            Page Not Found
          </h2>

          <p className="text-muted mb-4">
            Sorry, the page you are looking
            for does not exist or has been
            moved.
          </p>

          <Link
            to="/"
            className="btn btn-primary btn-lg px-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;