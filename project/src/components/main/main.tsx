import Footer from '../footer/footer';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import {connect, ConnectedProps} from 'react-redux';
import {StateType} from '../../types/state';
import {FilmType} from '../../types/types';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import {filterFilmsByGenre} from '../../utills/utils';
import ShowButton from '../show-button/show-button';
import {useState, MouseEvent} from 'react';

const CHUNK_LENGTH = 8;

const mapStateToProps = ({genre, films}: StateType) => ({
  genre,
  films,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main(props: PropsFromRedux): JSX.Element {
  const {genre, films} = props;

  const filmsByGenre = filterFilmsByGenre(films, genre);

  const sliceFilmList = (list: FilmType[]): FilmType[] => [...filmsByGenre.slice(0, list.length + CHUNK_LENGTH)];

  const [filmsList, setFilmsList] = useState(filmsByGenre.slice(0, CHUNK_LENGTH));


  const handleShowButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setFilmsList(sliceFilmList);
  };

  //TODO добавить получение данных для промо с сервера
  const promo: FilmType = films[0];

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
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
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{promo.released}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <CatalogGenresList/>
          <CatalogFilmsList films={filmsList}/>
          <ShowButton onClickHandler={handleShowButtonClick}/>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export {Main};
export default connector(Main);
