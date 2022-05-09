import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './application/generalComponents/footer';
import NotFound from './application/notFound';
import LoginPage from './application/authorizationForms/loginPage';
import Navigation from './application/generalComponents/navigation';
import WelcomePage from './application/welcomePage/welcomePage';
import MainPage from './application/mainPage';
import BoardPage from './application/boardPage';
import SignupPage from './application/authorizationForms/signupPage';

function App() {
  return (
    <div className="App">
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/Main" element={<MainPage />} />
        <Route path="/Board" element={<BoardPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
