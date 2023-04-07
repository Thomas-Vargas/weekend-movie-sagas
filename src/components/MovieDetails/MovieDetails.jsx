import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector(store => store.movieDetails);
  const { id } = useParams();
  console.log('movie details:', movieDetails);

  //dispatch function to be called in useEffect
  const getMovieDetails = () => {
    dispatch({
      type: 'FETCH_MOVIE_DETAILS',
      payload: id
    })
  }

  useEffect(() => {
    getMovieDetails();
  }, [])

  return (
    <>
      {movieDetails.title ? 
      <div>
        <h1>{movieDetails.title}</h1>
        <img src={movieDetails.poster}></img>
        <p>{movieDetails.genres}</p>
        <p>{movieDetails.description}</p>
      </div> :
      <div>loading</div>
      }
    </>
  )
}

export default MovieDetails;