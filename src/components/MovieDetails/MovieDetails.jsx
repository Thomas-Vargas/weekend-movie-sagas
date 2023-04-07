import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const movieDetails = useSelector((store) => store.movieDetails);
  const { id } = useParams();
  console.log("movie details:", movieDetails);

  //dispatch function to be called in useEffect
  const getMovieDetails = () => {
    dispatch({
      type: "FETCH_MOVIE_DETAILS",
      payload: id,
    });
  };

  const handleBack = () => {
    console.log("hello");
    dispatch({ type: "CLEAR_MOVIE_DETAILS" });
    history.push("/");
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
      <button onClick={() => handleBack()}>Back</button>
      {movieDetails.title ? (
        <div className="movie-description">
          <div className="movie-card">
            <Card sx={{ maxWidth: 700, padding: 2 }}>
              <CardContent>
                <Typography sx={{ fontSize: 30 }} gutterBottom>
                  {movieDetails.title}
                </Typography>
                <img
                  onClick={() => history.push(`/details/${movieDetails.id}`)}
                  className="poster"
                  src={movieDetails.poster}
                  alt={movieDetails.title}
                />
                <Typography sx={{ fontSize: 20 }} gutterBottom>
                  {movieDetails.genres}
                </Typography>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {movieDetails.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MovieDetails;
