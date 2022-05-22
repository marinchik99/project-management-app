import { Avatar, Button, ButtonGroup, Stack, ThemeProvider } from '@mui/material';
import React from 'react';
import { Trans } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { logout, selectCurrentUser } from '../../../store/reducers/authSlice';
import theme from '../../../utils/themeSettings';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: '#fff !important',
    },
    children: name[0].toUpperCase(),
  };
};

const UserToolbar = () => {
  const { token, login } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {!token && (
          <ButtonGroup className="auth-buttons">
            <Button variant="outlined" className="auth-login">
              <NavLink to="/Login">
                <Trans i18nKey="header.loginBtn">Войти</Trans>
              </NavLink>
            </Button>
            <Button variant="contained" className="auth-signup">
              <NavLink to="/Signup">
                <Trans i18nKey="header.signupBtn">Зарегистрироваться</Trans>
              </NavLink>
            </Button>
          </ButtonGroup>
        )}
        {token && (
          <Stack direction="row" spacing={2}>
            <NavLink to="/Edit">
              <Avatar {...stringAvatar(login)} style={{ cursor: 'pointer' }} />
            </NavLink>
            <Button variant="outlined" onClick={onClick}>
              <Trans i18nKey="header.logoutBtn">Выйти</Trans>
            </Button>
          </Stack>
        )}
      </>
    </ThemeProvider>
  );
};

export default UserToolbar;
