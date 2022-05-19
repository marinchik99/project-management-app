import React from 'react';
import '../../css/welcome.css';
import { Button, ButtonGroup, Container, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AboutTeam from './aboutTeam';
import AboutProject from './aboutProject';
import AboutCourse from './aboutCourse';

export default function WelcomePage() {
  return (
    <section className="welcome-page">
      <Container maxWidth="xl" className="general-welcome">
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={6} className="general-text">
            <h1 className="general-name">Remboard</h1>
            <h2 className="general-desript">
              Помогает эффективно организовать работу. Создавайте и отслеживайте задачи, а также
              управляйте ими и делитесь информацией с участниками команды.
            </h2>
          </Grid>
          <Grid item xs={6}>
            <img
              className="general-pict"
              src={require('../../assets/welcome/general.png')}
              alt="general"
            />
          </Grid>
        </Grid>
      </Container>
      <AboutProject />
      <AboutCourse />
      <AboutTeam />
    </section>
  );
}
