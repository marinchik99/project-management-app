import { Container, Grid } from '@mui/material';
import React from 'react';
import '../../css/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="xl">
        <Grid container spacing={0} justifyContent="space-between" alignItems="center">
          <Grid item xs={1}>
            <a href="https://rs.school/js" target="_blank" rel="noreferrer">
              <img
                src="https://rs.school/images/rs_school_js.svg"
                alt="logo"
                className="logo-icon"
              />
            </a>
          </Grid>
          <Grid item xs={8} className="github-accounts">
            <a
              className="git-acc"
              href="https://github.com/marinchik99"
              target="_blank"
              rel="noreferrer"
            >
              Марина
            </a>
            <a
              className="git-acc"
              href="https://github.com/petr9ra"
              target="_blank"
              rel="noreferrer"
            >
              Петр
            </a>
            <a
              className="git-acc"
              href="https://github.com/mayerror"
              target="_blank"
              rel="noreferrer"
            >
              Сергей
            </a>
          </Grid>
          <Grid item xs={2}>
            <h5 className="footer-year"> 2022 </h5>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
