import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../css/notFound.css';

export default function NotFound() {
  return (
    <div className="notFound-page">
      <div className="notFound-cont">
        <h1 className="error">
          <Trans i18nKey="404page.mainText">Такая страница не найдена</Trans>
        </h1>
        <div className="redirect">
          <Trans i18nKey="404page.redirectText">Перейти на</Trans>

          <Link className="error-link" to="/Boards">
            <Trans i18nKey="404page.redirectLink">Главную</Trans>
          </Link>
        </div>
      </div>
    </div>
  );
}
