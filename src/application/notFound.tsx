import React from 'react';
import { Link } from 'react-router-dom';
import '../css/notFound.css';

export default function NotFound() {
  return (
    <div className="notFound-page">
      <div className="notFound-cont">
        <h1 className="error"> This page not found</h1>
        <div className="redirect">
          Go to
          <Link className="error-link" to="/Boards">
            Main page
          </Link>
        </div>
      </div>
    </div>
  );
}
