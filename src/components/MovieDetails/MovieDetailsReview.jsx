import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const MovieDetailsReview = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      const fetchedReview = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=1126731b5a5395dcd41fc300a6be481e`
      );
      setReview(fetchedReview.data.results);
    };
    fetchReview();
    // eslint-disable-next-line
  }, [movieId]);

  return (
    <div>
      {review.length > 0 ? (
        <ul>
          {review.map(el => (
            <li key={review.indexOf(el)}>
              <b>{el.author}</b>
              <article>{el.content}</article>
            </li>
          ))}
        </ul>
      ) : (
        <div>This video has no review</div>
      )}
    </div>
  );
};

export default MovieDetailsReview;
