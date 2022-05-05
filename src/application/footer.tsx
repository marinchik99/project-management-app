import React from 'react';
import '../css/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="logo">
          <a href="https://rs.school/js" target="_blank" rel="noreferrer">
            <img src="https://rs.school/images/rs_school_js.svg" alt="logo" className="logo-icon" />
          </a>
        </div>
        <div className="git">
          <a
            className="git-acc"
            href="https://github.com/marinchik99"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            Марина{' '}
          </a>
          <a className="git-acc" href="https://github.com/petr9ra" target="_blank" rel="noreferrer">
            {' '}
            Петр{' '}
          </a>
          <a
            className="git-acc"
            href="https://github.com/mayerror"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            Сергей{' '}
          </a>
        </div>
        <h5 className="footer-year"> 2022 </h5>
      </div>
    </footer>
  );
}
