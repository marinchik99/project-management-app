import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, Container, Grid } from '@mui/material';

export default function AboutTeam() {
  const animation = {
    hidden: {
      opacity: 0,
    },
    visible: (custom: number) => ({
      y: 0,
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  };

  return (
    <motion.section
      data-testid="section-visible"
      className="team"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <Container maxWidth="xl" className="team-container">
        <h3 className="team-title">О разработчиках</h3>
        <Grid container spacing={2} direction="column" className="team-block">
          <motion.section custom={1} variants={animation} data-testid="section-one">
            <Grid container item xs={6} className="team-card">
              <Grid item xs={4} className="desk-text">
                <Avatar
                  alt="Marina"
                  className="avatar"
                  src={require('../../assets/welcome/avatar-marina.JPG')}
                  sx={{ width: 150, height: 150 }}
                />
              </Grid>
              <Grid item xs={8} className="team-text">
                <div className="team-main-text">
                  <h3 className="team-name">Марина</h3>
                  <h4 className="developer">Team leader, frontend developer</h4>
                  <p className="person-text">Структура приложения, роутинг, welcome-page.</p>
                </div>
                <a
                  className="git-icon"
                  href="https://github.com/marinchik99"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={require('../../assets/welcome/github.png')} alt="github" />
                </a>
              </Grid>
            </Grid>
          </motion.section>
          <motion.section custom={2} variants={animation} data-testid="section-two">
            <Grid container item xs={6} className="team-card">
              <Grid item xs={4} className="desk-text">
                <Avatar
                  alt="Petr"
                  className="avatar"
                  //src={}
                  sx={{ width: 150, height: 150 }}
                />
              </Grid>
              <Grid item xs={8} className="team-text">
                <div className="team-main-text">
                  <h3 className="team-name">Петр</h3>
                  <h4 className="developer">Frontend developer</h4>
                  <p className="person-text">Здесь будет описание того, что сделали</p>
                </div>
                <a
                  className="git-icon"
                  href="https://github.com/petr9ra"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={require('../../assets/welcome/github.png')} alt="github" />
                </a>
              </Grid>
            </Grid>
          </motion.section>
          <motion.section custom={3} variants={animation} data-testid="section-three">
            <Grid container item xs={6} className="team-card">
              <Grid item xs={4} className="desk-text">
                <Avatar
                  alt="Sergey"
                  className="avatar"
                  //src={}
                  sx={{ width: 150, height: 150 }}
                />
              </Grid>
              <Grid item xs={8} className="team-text">
                <div className="team-main-text">
                  <h3 className="team-name">Сергей</h3>
                  <h4 className="developer">Frontend developer</h4>
                  <p className="person-text">Здесь будет описание того, что сделали</p>
                </div>
                <a
                  className="git-icon"
                  href="https://github.com/mayerror"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={require('../../assets/welcome/github.png')} alt="github" />
                </a>
              </Grid>
            </Grid>
          </motion.section>
        </Grid>
      </Container>
    </motion.section>
  );
}
