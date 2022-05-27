import { Avatar, Button, ButtonGroup, Stack, ThemeProvider } from '@mui/material';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { logout, selectCurrentUser } from '../../../store/reducers/authSlice';
import theme from '../../../utils/themeSettings';

const UserToolbar = () => {
  const { token, login } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logout());
    navigate('/');
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: 'secondary.main',
      },
      children: name[0].toUpperCase(),
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {!token && (
          <ButtonGroup className="auth-buttons">
            <Button variant="outlined" className="auth-login">
              <NavLink to="/Login">Log in</NavLink>
            </Button>
            <Button variant="contained" className="auth-signup">
              <NavLink to="/Signup">Sign up</NavLink>
            </Button>
          </ButtonGroup>
        )}
        {token && (
          <Stack direction="row" spacing={2}>
            <NavLink to="/Edit">
              <Avatar {...stringAvatar(login)} style={{ cursor: 'pointer' }} />
            </NavLink>
            <Button variant="outlined" onClick={onClick}>
              Logout
            </Button>
          </Stack>
        )}
      </>
    </ThemeProvider>
  );
};

export default UserToolbar;
