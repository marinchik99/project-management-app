import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './application/generalComponents/footer';
import NotFound from './application/notFound';
import Navigation from './application/generalComponents/navigation';
import BoardPage from './application/boardPage/boardPage';
import WelcomePage from './application/welcomePage/welcomePage';
<<<<<<< HEAD
import BoardsPage from './application/boardsPage';
=======
import MainRoute from './application/mainRoute/MainRoute';
>>>>>>> 0323fe4743da9298cfebd7d7fa0f94ec443a40c7
import SignupPage from './application/authorizationForms/SignupPage/SignupPage';
import LoginPage from './application/authorizationForms/LoginPage/LoginPage';
import { useAppSelector } from './store';
import Header from './application/generalComponents/header';

function App() {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/Signup" element={token ? <Navigate to="/" /> : <SignupPage />} />
<<<<<<< HEAD
        <Route path="/Board" element={<BoardPage />} />
        <Route path="/Boards" element={<BoardsPage />} />
=======
        <Route path="/Boards" element={<MainRoute />} />
>>>>>>> 0323fe4743da9298cfebd7d7fa0f94ec443a40c7
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
