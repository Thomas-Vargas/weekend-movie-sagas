import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'; 

const MovieItem = ({ movie }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEdit = () => {
    history.push(`/edit/${movie.id}`);
    dispatch({type: 'CLEAR_MOVIE_DETAILS'})
  }

  return (
    <div className="movie-card">
      <Card sx={{ minWidth: 300, padding: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            {movie.title}
          </Typography>
        </CardContent>
        <img
          onClick={() => history.push(`/details/${movie.id}`)}
          className="poster"
          src={movie.poster}
          alt={movie.title}
        />
        <div>
        {/* <Button onClick={() => handleEdit()} variant="contained">Edit</Button> */}
        </div>
      </Card>
    </div>
  );
};

export default MovieItem;
