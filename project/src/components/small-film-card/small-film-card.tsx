import { generatePath, Link, useHistory } from 'react-router-dom';
import { FilmType } from '../../types/types';
import { useEffect, useRef, useState } from 'react';
import { AppRoute } from '../../const';
import Page404 from '../page-404/page-404';

type SmallFilmСardProps = {
  film: FilmType;
};

function SmallFilmCard({ film }: SmallFilmСardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
  };

  const handleClick = () => {
    history.push(filmPath);
  };

  const stopPlay = (video: HTMLVideoElement | null): void => {
    if (video) {
      const videoSrc = video.src;
      video.src = videoSrc;
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timeout = setTimeout(() => videoRef.current?.play(), 1000);
    } else {
      stopPlay(videoRef.current);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isPlaying]);

  if (!film) {
    return <Page404 />;
  }
  const filmPath = generatePath(AppRoute.Film, { id: film.id });

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="small-film-card__image">
        <video
          poster={film.previewImage}
          src={film.previewVideoLink}
          ref={videoRef}
          preload="none"
          loop
          muted
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={filmPath}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
