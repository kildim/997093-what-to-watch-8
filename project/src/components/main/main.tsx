import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import Footer from '../footer/footer';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import ShowButton from '../show-button/show-button';
import { ThunkAppDispatch } from '../../types/action';
import { fetchPromoAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import MainHeader from './main-header';
import MainPromo from './main-promo';
import {
  getFilms,
  getFilmsByGenre,
  getGenre,
  getPromo
} from '../../store/reducers/data-reducer/selectors';

const CHUNK_LENGTH = 8;

function Main(): JSX.Element {
  const genre = useSelector(getGenre);
  const films = useSelector(getFilms);
  const promoFilm = useSelector(getPromo);
  const [listCount, setListCount] = useState(CHUNK_LENGTH);
  const dispatch = useDispatch();
  useEffect(() => {
    (dispatch as ThunkAppDispatch)(fetchPromoAction());
  }, [dispatch, films]);

  useEffect(() => {
    setListCount(CHUNK_LENGTH);
  }, [genre]);

  const handleShowButtonClick = () => {
    setListCount((count) => {
      count += CHUNK_LENGTH;
      return count;
    });
  };

  const filmsList =  useSelector(getFilmsByGenre);

  const isShowButtonVisible: boolean = useMemo(
    () => filmsList.length > listCount,
    [filmsList.length, listCount],
  );

  if (!promoFilm) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt="Film background" />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <MainHeader />
        <MainPromo promo={promoFilm} />
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <CatalogGenresList />
          <CatalogFilmsList films={filmsList.slice(0, listCount)} />
          <ShowButton
            onClickHandler={handleShowButtonClick}
            visibility={isShowButtonVisible}
          />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Main;
