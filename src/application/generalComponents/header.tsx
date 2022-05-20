import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ModalState } from '../../.d';
import { useAppDispatch, useAppSelector } from '../../store';
import { setModalState } from '../../store/reducers/boardsReducer';
import { setLanguage } from '../../store/reducers/settingsReducer';
import '../../css/header.scss';

export default function Header() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(({ settingsReducer }) => settingsReducer);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const handleNewBoardClick = () => {
    const modalState: ModalState = {
      isOpen: true,
      type: 'board',
    };
    dispatch(setModalState(modalState));
  };

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newLang: string | null) => {
    dispatch(setLanguage(newLang));
  };

  return (
    <header className={scroll ? 'header header--sticky' : 'header'}>
      <Container maxWidth="xl">
        <Grid container spacing={0} justifyContent="space-between" alignItems="center">
          <Grid item xs={3}>
            <NavLink to="/boards" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" onClick={handleNewBoardClick}>
                Создать новую доску
              </Button>
            </NavLink>
          </Grid>
          <Grid item xs={9} className="authoriz-butt-cont">
            <ToggleButtonGroup
              value={language}
              exclusive
              onChange={handleAlignment}
              aria-label="language"
              className="lang-toggle"
            >
              <ToggleButton value="ru" aria-label="ru">
                Ru
              </ToggleButton>
              <ToggleButton value="en" aria-label="en">
                En
              </ToggleButton>
            </ToggleButtonGroup>
            <ButtonGroup className="auth-buttons">
              <Button variant="outlined" className="auth-login">
                <NavLink to="/Login">Log in</NavLink>
              </Button>
              <Button variant="contained" className="auth-signup">
                <NavLink to="/Signup">Sign up</NavLink>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
}
