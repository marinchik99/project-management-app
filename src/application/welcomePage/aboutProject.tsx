import React from 'react';
import { motion } from 'framer-motion';
import { Button, Container, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AboutProject() {
  const textAnimation = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  };

  return (
    <motion.section
      className="project"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
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
            <motion.p custom={1} variants={textAnimation}>
              Начните с создания досок, в которые будете помещать списки и карточки с заданиями. Они
              могут располагаться в нужном для Вас порядке.
            </motion.p>
            <motion.div custom={1} variants={textAnimation}>
              <NavLink to="/Boards" style={{ textDecoration: 'none' }}>
                <Button variant="outlined">Начать</Button>
              </NavLink>
            </motion.div>
          </Grid>
          <Grid item xs={5} className="desk-text">
            <motion.img
              custom={1}
              variants={textAnimation}
              className="desk-pict"
              src={require('../../assets/welcome/desk1.png')}
              alt="desk"
            />
          </Grid>
        </Grid>
        <hr className="block-line" />
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={5} className="desk-text">
            <motion.p custom={2} variants={textAnimation}>
              Карточки можно переносить в другой список, редактировать и удалять. Удаление доски
              автоматически удаляет привязанные к ней списки и каточки.
            </motion.p>
          </Grid>
          <Grid item xs={5} className="desk-text">
            <motion.img
              custom={2}
              variants={textAnimation}
              className="desk-pict"
              src={require('../../assets/welcome/move1.png')}
              alt="desk"
            />
          </Grid>
        </Grid>
      </Container>
    </motion.section>
  );
}
