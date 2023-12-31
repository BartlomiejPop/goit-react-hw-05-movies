import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './MovieDetails.module.css';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({}); // zmiana pustej tablicy na pusty obiekt

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=1126731b5a5395dcd41fc300a6be481e`
        );
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.movieInfo}>
        <button className={styles.btn}>
          <Link to="/">Go back</Link>
        </button>
        <img
          width="200px"
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
        />
        <h2>{details.title}</h2>
        <span>User Score: {Math.round(details.vote_average * 10)}%</span>
        <h3>Overview</h3>
        <span className={styles.overview}>{details.overview}</span>
        <h3>Genres</h3>
        <ul>
          {details.genres &&
            details.genres.map(el => <li key={el.id}>{el.name}</li>)}
        </ul>
      </div>
      <div>
        <span>Additional information</span>

        <nav>
          <ul className={styles.list}>
            <li>
              <Link className={styles.btn} to="cast">
                Cast
              </Link>
            </li>
            <li>
              <Link className={styles.btn} to="review">
                Reviews
              </Link>
            </li>
          </ul>
          <Outlet />
        </nav>
      </div>
    </div>
  );
};

export default MovieDetails;
