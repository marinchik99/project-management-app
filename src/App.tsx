import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './application/generalComponents/footer';
import NotFound from './application/notFound';
import BoardPage from './application/boardPage/boardPage';
import WelcomePage from './application/welcomePage/welcomePage';
import MainRoute from './application/mainRoute/MainRoute';
import SignupPage from './application/authorizationForms/SignupPage/SignupPage';
import LoginPage from './application/authorizationForms/LoginPage/LoginPage';
import { useAppDispatch, useAppSelector } from './store';
import Header from './application/generalComponents/header';
import { selectCurrentUser } from './store/reducers/authSlice';
import { getUsers } from './store/reducers/usersReducer';

function App() {
  const { token } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUsers());
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/Boards" /> : <WelcomePage />} />
        <Route path="/Login" element={token ? <Navigate to="/Boards" /> : <LoginPage />} />
        <Route path="/Signup" element={token ? <Navigate to="/Boards" /> : <SignupPage />} />
        <Route path={`/Boards/boards/:id`} element={!token ? <Navigate to="/" /> : <BoardPage />} />
        <Route path="/Boards" element={!token ? <Navigate to="/" /> : <MainRoute />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
