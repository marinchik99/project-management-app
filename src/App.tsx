//import './global.css';
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Footer from './application/footer';
import NotFound from './application/notFound';
import FirstPage from './application/firstPage';
import LoginPage from './application/loginPage';
import ProjectPage from './application/projectPage';
import ProjectsPage from './application/projectsPage';
import Navigation from './application/navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
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
