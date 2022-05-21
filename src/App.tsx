import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './application/generalComponents/footer';
import NotFound from './application/notFound';
import Navigation from './application/generalComponents/navigation';
import WelcomePage from './application/welcomePage/welcomePage';
import MainRoute from './application/mainRoute/MainRoute';
import SignupPage from './application/authorizationForms/SignupPage/SignupPage';
import LoginPage from './application/authorizationForms/LoginPage/LoginPage';
import { useAppSelector } from './store';
import Header from './application/generalComponents/header';
import { selectCurrentUser } from './store/reducers/authSlice';

function App() {
  const token = useAppSelector(selectCurrentUser);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/Signup" element={token ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/Boards" element={<MainRoute />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
