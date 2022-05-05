import React from 'react';
import { Link } from 'react-router-dom';
import '../css/notFound';

export default function NotFound() {
    return (
      <div data-testid="notFound-page">
        <h1 className="error"> 404 Not Found</h1>
        <div className="redirect">
          Go
          <Link className="error-link" to="/">
            Home
          </Link>
        </div>
      </div>
    );
}
