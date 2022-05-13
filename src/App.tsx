import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './application/generalComponents/footer';
import NotFound from './application/notFound';
import Navigation from './application/generalComponents/navigation';
import WelcomePage from './application/welcomePage/welcomePage';
import BoardsPage from './application/mainRoute/BoardsPage';
import MainPage from './application/mainPage';
import SignupPage from './application/authorizationForms/SignupPage/SignupPage';
import LoginPage from './application/authorizationForms/LoginPage/LoginPage';
import { useAppSelector } from './store';

function App() {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <div className="App">
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/Signup" element={token ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/Main" element={<MainPage />} />
        <Route path="/Boards" element={<BoardsPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
