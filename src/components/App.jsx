import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { Routes, Route, NavLink } from 'react-router-dom';
import styles from './App.module.css';

import { Home } from '../components/Home/Home';
import { Movies } from '../components/Movies/Movies';

const MovieDetails = lazy(() =>
  import('../components/MovieDetails/MovieDetails')
);
const MovieDetailsCast = lazy(() =>
  import('../components/MovieDetails/MovieDetailsCast')
);
const MovieDetailsReview = lazy(() =>
  import('../components/MovieDetails/MovieDetailsReview')
);

export const App = () => {
  const [error, setError] = useState(null);
  const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?query=trending&api_key=1126731b5a5395dcd41fc300a6be481e`
        );
        setTrendings(response.data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <nav>
        <NavLink to="/">
          <button className={styles.homeBtn}>Home</button>
        </NavLink>
        <NavLink to="/movies">
          <button className={styles.homeBtn}>Movies</button>
        </NavLink>
      </nav>
      <Routes>
        {trendings.length !== 0 && (
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home movies={trendings} />
              </Suspense>
            }
          />
        )}
        <Route path="/movies" element={<Movies />} />
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieDetails />
            </Suspense>
          }
        >
          <Route
            path="cast"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MovieDetailsCast />
              </Suspense>
            }
          />
          <Route
            path="review"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MovieDetailsReview />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
