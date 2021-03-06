import { generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useDispatch } from 'react-redux';
import { redirectToRoute } from '../../store/action';
import {FilmType} from '../../types/types';

type PlayFilmPropsType = {
  film: FilmType
}

function PlayFilm({film}: PlayFilmPropsType): JSX.Element {
  const dispatch = useDispatch();

  const handlePlayFilm = () => {
    if (film) {
      const playerRoute = generatePath(AppRoute.Player, { id: film.id });
      dispatch(redirectToRoute(playerRoute));
    }
  };

  return (
    <button
      className="btn btn--play film-card__button"
      type="button"
      onClick={handlePlayFilm}
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s" />
      </svg>
      <span>Play</span>
    </button>
  );
}

export default PlayFilm;
