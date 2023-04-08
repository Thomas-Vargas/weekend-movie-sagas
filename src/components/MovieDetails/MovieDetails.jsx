import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  }

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
      {movieDetails.title ? (
        <div className="movie-description">
          <div className="movie-card">
            <Card sx={{ maxWidth: 700, padding: 2 }}>
              <CardContent>
                <Typography sx={{ fontSize: 30 }} gutterBottom>
                  {movieDetails.title}
                </Typography>
                <img
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
                <Button onClick={handleEdit} variant="contained">Edit</Button>
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
