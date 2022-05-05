//import './global.css';
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Footer from './application/footer';
import NotFound from './application/notFound';
import FirstPage from './application/firstPage';
import LoginPage from './application/loginPage';
import ProjectPage from './application/projectPage';
import ProjectsPage from './application/projectsPage';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <nav className="navbar">
          <NavLink
            data-testid="home-link"
            to="/"
            className="navbar__a"
            style={({ isActive }) =>
              isActive ? { color: 'red' } : { color: 'black' }
            }
          >
            Главная
          </NavLink>
          <NavLink
            data-testid="about-link"
            to="/Login"
            className="navbar__a"
            style={({ isActive }) =>
              isActive ? { color: 'red' } : { color: 'black' }
            }
          >
            Log in
          </NavLink>
          <NavLink
            data-testid="form-link"
            to="/Project"
            className="navbar__a"
            style={({ isActive }) =>
              isActive ? { color: 'red' } : { color: 'black' }
            }
          >
            Проект
          </NavLink>
          <NavLink
            data-testid="modal-link"
            to="/Projects"
            className="navbar__a"
            style={({ isActive }) =>
              isActive ? { color: 'red' } : { color: 'black' }
            }
          >
            Проекты
          </NavLink>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Project" element={<ProjectPage />} />
        <Route path="/Projects" element={<ProjectsPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
