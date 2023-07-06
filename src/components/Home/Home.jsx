import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Home = trendings => {
  console.log(trendings);
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

Home.propTypes = {
  trendings: PropTypes.object,
};
