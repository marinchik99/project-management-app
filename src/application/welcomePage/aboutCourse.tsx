import React from 'react';
import { Trans } from 'react-i18next';
import { Container, Tooltip } from '@mui/material';
import '../../css/welcome.css';

export default function AboutCourse() {
  return (
    <section className="cource">
      <Container maxWidth="xl" className="course-container">
        <h3 className="course-title">
          <Trans i18nKey="welcomePage.aboutCourseTitle">О курсе</Trans>
        </h3>
        <a
          href="https://rs.school/js"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Tooltip title="Перейти по ссылке">
            <div className="course-block">
              <p className="course-text">
                <Trans i18nKey="welcomePage.aboutCourseDescription">
                  Курс React предназначен для студентов RS School, которые прошли RS School stage
                  #2, а также для тех, кто имеет знания и практический опыт использования следующих
                  технологий и инструментов:
                </Trans>
              </p>
              <div className="course-list">
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>Git, GitHub</li>
                <li>NPM, Webpack</li>
                <li>CSS3 / HTML5</li>
                <li>Chrome DevTools, Figma</li>
                <li>REST API</li>
              </div>
            </div>
          </Tooltip>
        </a>
      </Container>
    </section>
  );
}
