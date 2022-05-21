import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { selectCurrentUser } from '../../../store/reducers/authSlice';

const UserToolbar = () => {
  const token = useAppSelector(selectCurrentUser);
  const 

  const onClick = () => {

  }

  console.log('token ' + token);

  return (
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
        <Button variant="outlined" className="auth-login" onClick={onClick}>
        </Button>
      )}
    </>
  );
};

export default UserToolbar;
