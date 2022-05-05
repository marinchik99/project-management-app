import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <div className="App-header">
      <nav className="navbar">
        <NavLink
          data-testid="home-link"
          to="/"
          className="navbar__a"
          style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'black' })}
        >
          Welcome
        </NavLink>
        <NavLink
          data-testid="about-link"
          to="/Login"
          className="navbar__a"
          style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'black' })}
        >
          Log in
        </NavLink>
        <NavLink
          data-testid="about-link"
          to="/Signup"
          className="navbar__a"
          style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'black' })}
        >
          Sign up
        </NavLink>
        <NavLink
          data-testid="form-link"
          to="/Main"
          className="navbar__a"
          style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'black' })}
        >
          main
        </NavLink>
        <NavLink
          data-testid="modal-link"
          to="/Board"
          className="navbar__a"
          style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'black' })}
        >
          Board
        </NavLink>
      </nav>
    </div>
  );
}
