import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

const MovieItem = ({ movie }) => {
  const history = useHistory();

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
          className='poster'
          src={movie.poster}
          alt={movie.title}
        />
      </Card>
    </div>
  );
};

export default MovieItem;
