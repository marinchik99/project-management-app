import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './application/footer';
import NotFound from './application/notFound';
import LoginPage from './application/loginPage';
import Navigation from './application/navigation';
import WelcomePage from './application/welcomePage';
import MainPage from './application/mainPage';
import BoardPage from './application/boardPage';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Main" element={<MainPage />} />
        <Route path="/Board" element={<BoardPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
