import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const MovieDetailsCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCredits = async () => {
      const credits = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1126731b5a5395dcd41fc300a6be481e`
      );
      setCast(credits.data.cast);
    };
    fetchCredits();
  }, [movieId]);

  return (
    <div>
      {cast.length > 0 ? (
        <ul>
          {cast.map(el => (
            <li key={el.id}>
              <img
                width="150px"
                src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                alt={el.name}
              />
              <span>{el.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading cast...</div>
      )}
    </div>
  );
};

export default MovieDetailsCast;
