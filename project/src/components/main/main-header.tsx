import UserBlock from '../user-block/user-block';
import {memo} from 'react';

function MainHeader(): JSX.Element {
  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <a className="logo__link" href={'/'}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <UserBlock />
    </header>
  );
}

export default memo(MainHeader);
