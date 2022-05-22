import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ModalState } from '../../.d';
import { useAppDispatch, useAppSelector } from '../../store';
import { setModalState } from '../../store/reducers/boardsReducer';
import { setLanguage } from '../../store/reducers/settingsReducer';
import '../../css/header.scss';
import UserToolbar from './UserToolbar/UserToolbar';
import { selectCurrentUser } from '../../store/reducers/authSlice';

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

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newLang: string | null) => {
    dispatch(setLanguage(newLang));
  };

  return (
    <header className={scroll ? 'header header--sticky' : 'header'}>
      <Container maxWidth="xl">
        <Grid
          container
          flexWrap="wrap"
          spacing={0}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={3}>
            {token && (
              <>
                <NavLink to="/boards" style={{ marginRight: '20px' }}>
                  <Button variant="outlined">Доски</Button>
                </NavLink>
                <NavLink to="/boards">
                  <Button variant="outlined" onClick={handleNewBoardClick}>
                    Создать новую доску
                  </Button>
                </NavLink>
              </>
            )}
          </Grid>
          <Grid item xs={9} className="authoriz-butt-cont">
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
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
              <UserToolbar />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
}
