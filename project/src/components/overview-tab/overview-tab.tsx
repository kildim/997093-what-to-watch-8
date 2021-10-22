import {Film} from '../../types/film';

type OverviewTabProps = {
  film: Film
}

function OverviewTab ({film}: OverviewTabProps) {
  const starring = `${film.starring.join(', ')}.`;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>
          {film.description}I
        </p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {starring}</strong>
        </p>
      </div>
    </>
  );
}

export default OverviewTab;
