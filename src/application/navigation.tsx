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
          Главная
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
          data-testid="form-link"
          to="/Project"
          className="navbar__a"
          style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'black' })}
        >
          Проект
        </NavLink>
        <NavLink
          data-testid="modal-link"
          to="/Projects"
          className="navbar__a"
          style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'black' })}
        >
          Проекты
        </NavLink>
      </nav>
    </div>
  );
}
