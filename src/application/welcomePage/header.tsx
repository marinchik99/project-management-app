import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ModalState } from '../../.d';
import { useAppDispatch, useAppSelector } from '../../store';
import { setModalState } from '../../store/reducers/boardsReducer';
import { setLanguage } from '../../store/reducers/settingsReducer';
import { selectCurrentUser } from '../../store/reducers/authSlice';
import { Box, Button, Container, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../css/header.scss';
import UserToolbar from '../generalComponents/UserToolbar/UserToolbar';

export default function Header() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(({ settingsReducer }) => settingsReducer);
  const { token } = useAppSelector(selectCurrentUser);

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

  const handleLanguageChange = (event: React.MouseEvent<HTMLElement>, newLang: string | null) => {
    dispatch(setLanguage(newLang));
  };

  function toggleMenu(type: string) {
    const burgerButton = document.querySelector('.burger');
    const burgerNav = document.querySelector('.header__block-list');
    const body = document.querySelector('body');

    if (type === 'burger') {
      burgerButton.classList.toggle('active');
      burgerNav.classList.toggle('active');
      body.classList.toggle('lock');
    }
    if (type === 'link') {
      burgerButton.classList.remove('active');
      burgerNav.classList.remove('active');
      body.classList.remove('lock');
    }
  }

  return (
    <header className={scroll ? 'header header--sticky' : 'header'}>
      <button className="burger" onClick={() => toggleMenu('burger')}>
        <span className="burger__line"></span>
      </button>
      <Container maxWidth="xl">
        <Grid
          container
          flexWrap="wrap"
          spacing={0}
          justifyContent="space-between"
          alignItems="center"
          className="header__block-list"
        >
          <Grid item className="header__block">
            <NavLink to="/" style={{ marginRight: '20px' }} onClick={() => toggleMenu('link')}>
              <Button className="header__home-link" variant="text">
                Remboard
              </Button>
            </NavLink>
            {token && (
              <>
                <NavLink
                  to="/boards"
                  style={{ marginRight: '20px' }}
                  onClick={() => toggleMenu('link')}
                >
                  <Button variant="outlined">
                    <Trans i18nKey="header.boardsBtn">Доски</Trans>
                  </Button>
                </NavLink>
                <NavLink to="/boards">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleNewBoardClick();
                      toggleMenu('link');
                    }}
                  >
                    <Trans i18nKey="header.createBoardBtn">Создать новую доску</Trans>
                  </Button>
                </NavLink>
              </>
            )}
          </Grid>
          <Grid item className="header__block authoriz-butt-cont">
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
              <ToggleButtonGroup
                value={language}
                exclusive
                onChange={handleLanguageChange}
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
              <UserToolbar />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
}
