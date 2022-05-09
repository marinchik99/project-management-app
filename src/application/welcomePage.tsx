import React from 'react';
import '../css/welcome.css';
import { Avatar, Button, ButtonGroup, Container, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <section className="welcome-page">
      <Container maxWidth="xl" className="general-welcome">
        <Grid container spacing={1}>
          <Grid item xs={9}></Grid>
          <Grid item xs={3} className="authoriz-butt-cont">
            <ButtonGroup variant="text" aria-label="text button group" className="authoriz-buttons">
              <NavLink to="/Login" style={{ textDecoration: 'none' }}>
                <Button>Log in</Button>|
              </NavLink>
              <NavLink to="/Signup" style={{ textDecoration: 'none' }}>
                <Button>Sign up</Button>
              </NavLink>
            </ButtonGroup>
          </Grid>
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
              src={require('../assets/welcome/general.jpg')}
              alt="general"
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" className="desk-container">
        <Grid
          container
          spacing={1}
          className="desk-first"
          justifyContent="center"
          direction="row-reverse"
          alignItems="center"
        >
          <Grid item xs={5} className="desk-text">
            <p>
              Начните с создания досок, в которые будете помещать карточки с заданиями. Доски и
              карточки могут располагаться в нужном для Вас порядке.
            </p>
          </Grid>
          <Grid item xs={5} className="desk-text">
            <img className="desk-pict" src={require('../assets/welcome/desk.jpg')} alt="desk" />
          </Grid>
        </Grid>
        <hr className="block-line" />
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={5} className="desk-text">
            <p>
              Карточки можно переносить на другую доску, редактировать и удалять. Удаление доски
              автоматически удаляет привязанные к ней каточки.
            </p>
          </Grid>
          <Grid item xs={5} className="desk-text">
            <img className="desk-pict" src={require('../assets/welcome/move.png')} alt="desk" />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" className="team-container">
        <h3 className="team-title">О разработчиках</h3>
        <Grid container spacing={2} direction="column" className="team-block">
          <Grid container item xs={6} className="team-card">
            <Grid item xs={4} className="desk-text">
              <Avatar
                alt="Marina"
                className="avatar"
                src={require('../assets/welcome/avatar-marina.JPG')}
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs={8} className="team-text">
              <div className="">
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
                <img src={require('../assets/welcome/github.png')} alt="github" />
              </a>
            </Grid>
          </Grid>
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
              <div className="">
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
                <img src={require('../assets/welcome/github.png')} alt="github" />
              </a>
            </Grid>
          </Grid>
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
              <div className="">
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
                <img src={require('../assets/welcome/github.png')} alt="github" />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
