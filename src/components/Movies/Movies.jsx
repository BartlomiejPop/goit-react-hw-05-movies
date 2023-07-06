import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../Movies/Movies.module.css';

export const Movies = () => {
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const searchMovies = async phrase => {
    const nextParams = phrase !== '' ? { phrase } : {};
    setSearchParams(nextParams);
    const searchParams = new URLSearchParams(window.location.search);
    const title = searchParams.get('phrase');
    const films = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=1126731b5a5395dcd41fc300a6be481e`
    );
    setMovies(films.data.results);
  };

  return (
    <div>
      <input
        type="text"
        className={styles.input}
        onChange={e => setValue(e.target.value)}
      />
      <button className={styles.button} onClick={() => searchMovies(value)}>
        Search
      </button>
      {searchParams.size !== 0 ? (
        <ul>
          {movies.map(el => (
            <Link to={`/movies/${el.id}`} key={el.id}>
              <li>{el.title}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <h2>Search for films</h2>
      )}
    </div>
  );
};
