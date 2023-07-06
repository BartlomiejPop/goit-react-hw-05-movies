import { Link } from 'react-router-dom';

export const Home = trendings => {
  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {trendings.movies.map(el => {
          return (
            <Link to={`/movies/${el.id}`} key={el.id}>
              {' '}
              <li>{el.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
