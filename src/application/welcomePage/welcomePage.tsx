import React from 'react';
import { Trans } from 'react-i18next';
import { Container, Grid } from '@mui/material';
import AboutTeam from './aboutTeam';
import AboutProject from './aboutProject';
import AboutCourse from './aboutCourse';
import '../../css/welcome.css';

export default function WelcomePage() {
  return (
    <section className="welcome-page">
      <Container maxWidth="xl" className="general-welcome">
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={6} className="general-text">
            <h1 className="general-name">Remboard</h1>
            <h2 className="general-desript">
              <Trans i18nKey="welcomePage.generalDesript">
                Помогает эффективно организовать работу. Создавайте и отслеживайте задачи, а также
                управляйте ими и делитесь информацией с участниками команды.
              </Trans>
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
