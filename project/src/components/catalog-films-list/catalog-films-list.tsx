import {FilmType} from '../../types/types';
import SmallFilmCard from '../small-film-card/small-film-card';

type CatalogFilmsListProps = {
  films: FilmType[];
}

function CatalogFilmsList(props: CatalogFilmsListProps): JSX.Element {
  const {films} = props;

  return (
    <div className="catalog__films-list">
      {films.map((film: FilmType) => (
        <SmallFilmCard key={film?.id} film={film}/>
      ))}
    </div>
  );
}

export default CatalogFilmsList;
