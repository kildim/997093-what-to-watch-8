import {Link, useRouteMatch} from 'react-router-dom';
import {connect, ConnectedProps, useDispatch} from 'react-redux';
import Footer from '../footer/footer';
import { AppRoute} from '../../const';
import FilmCardTabs from '../film-card-tabs/film-card-tabs';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import {buildSimilarFilmsPath} from '../../utils/utils';
import { StateType } from '../../types/state';
import {ThunkAppDispatch} from '../../types/action';

// import {fetchFilmAction} from '../../store/api-actions';
import {fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions';
// import {useEffect} from 'react';

const SIMILAR_NUMBER = 4;

const mapStateToProps = ({film, similarFilms, comments}: StateType) => ({
  film,
  similarFilms,
  comments,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Film(props: PropsFromRedux): JSX.Element {
  const {film, similarFilms } = props;
  const {url} = useRouteMatch();
  const similarFilmsPath =  buildSimilarFilmsPath(String(film.id));
  // const commentsPath = buildFilmCommentsPath(String(film.id));
  const dispatcher = useDispatch();

  // useEffect(() => {
  (dispatcher as ThunkAppDispatch)(fetchFilmAction(url));
  (dispatcher as ThunkAppDispatch)(fetchSimilarFilmsAction(similarFilmsPath));
  // (dispatcher as ThunkAppDispatch)(fetchFilmCommentsAction(commentsPath));
  // },[film]);


  const similarFilmsList = similarFilms.slice(0, SIMILAR_NUMBER);

  const FILM_CARD_INLINE_STYLE = {
    backgroundColor: film.backgroundColor,
  };

  return (
    <>
      <section
        className="film-card film-card--full"
        style={FILM_CARD_INLINE_STYLE}
      >
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img
                    src="img/avatar.jpg"
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`${url}/review`} className="btn film-card__button">
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={film.name}
                width="218"
                height="327"
              />
            </div>
            <FilmCardTabs film={film} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <CatalogFilmsList films={similarFilmsList} />
        </section>
        <Footer />
      </div>
    </>
  );
}

export { Film };
export default connector(Film);
