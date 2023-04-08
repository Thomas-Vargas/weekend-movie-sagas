import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const EditPage = () => {
  const [editedMovie, setEditedMovie] = useState({
    title: "",
    poster: "",
    description: "",
    genre_id: "",
  });
  const [genreToDisplay, setGenreToDisplay] = useState("Genres");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const movieDetails = useSelector((store) => store.movieDetails);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "FETCH_MOVIE_DETAILS",
      payload: id,
    });

    setEditedMovie(movieDetails);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const setGenre = (genreId) => {
    switch (genreId) {
      case 1:
        setGenreToDisplay("Adventure");
        break;
      case 2:
        setGenreToDisplay("Animated");
        break;
      case 3:
        setGenreToDisplay("Biographical");
        break;
      case 4:
        setGenreToDisplay("Comedy");
        break;
      case 5:
        setGenreToDisplay("Disaster");
        break;
      case 6:
        setGenreToDisplay("Drama");
        break;
      case 7:
        setGenreToDisplay("Epic");
        break;
      case 8:
        setGenreToDisplay("Fantasy");
        break;
      case 9:
        setGenreToDisplay("Musical");
        break;
      case 10:
        setGenreToDisplay("Romantic");
        break;
      case 11:
        setGenreToDisplay("Science Fiction");
        break;
      case 12:
        setGenreToDisplay("Space-Opera");
        break;
      case 13:
        setGenreToDisplay("Superhero");
        break;
    }

    setEditedMovie({ ...editedMovie, genre_id: genreId });
    // console.log(newMovie);
    setAnchorEl(null);
  };

  const handleInputChange = (keyToUpdate) => {
    console.log(keyToUpdate);
    setEditedMovie({ ...editedMovie, [keyToUpdate]: event.target.value });
    console.log(editedMovie);
  };

  const saveMovieChanges = () => {
    //send to movie details for now
    dispatch({
      type: 'UPDATE_MOVIE',
      payload: {...editedMovie, id: Number(id)}
    })

    setEditedMovie({
      title: "",
      poster: "",
      description: "",
      genre_id: "",
    })
    history.push('/')
  } 

  return (
    <div className="movie-edit">
      <Card sx={{ maxWidth: 700, padding: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 30 }} gutterBottom>
            {movieDetails.title}
          </Typography>
          <div className="edit-content">
            <div className="edit-inputs">
              <TextField
                onChange={() => handleInputChange("title")}
                value={
                  editedMovie ? editedMovie.title : movieDetails.title
                }
                id="outlined-basic"
                label="Title"
                variant="outlined"
              />
              <TextField
                onChange={() => handleInputChange("poster")}
                value={
                  editedMovie ? editedMovie.poster : movieDetails.poster
                }
                id="outlined-basic"
                label="Image"
                variant="outlined"
                sx={{ width: 400 }}
              />
              <TextField
                onChange={() => handleInputChange("description")}
                value={
                  editedMovie
                    ? editedMovie.description
                    : movieDetails.description
                }
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
              />
            </div>
            <div className="right-content">
              <img
                className="poster"
                src={movieDetails.poster}
                alt={movieDetails.title}
              />
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
              >
                {genreToDisplay}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={setGenre}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => setGenre(1)}>Adventure</MenuItem>
                <MenuItem onClick={() => setGenre(2)}>Animated</MenuItem>
                <MenuItem onClick={() => setGenre(3)}>Biographical</MenuItem>
                <MenuItem onClick={() => setGenre(4)}>Comedy</MenuItem>
                <MenuItem onClick={() => setGenre(5)}>Disaster</MenuItem>
                <MenuItem onClick={() => setGenre(6)}>Drama</MenuItem>
                <MenuItem onClick={() => setGenre(7)}>Epic</MenuItem>
                <MenuItem onClick={() => setGenre(8)}>Fantasy</MenuItem>
                <MenuItem onClick={() => setGenre(9)}>Musical</MenuItem>
                <MenuItem onClick={() => setGenre(10)}>Romantic</MenuItem>
                <MenuItem onClick={() => setGenre(11)}>
                  Science Fiction
                </MenuItem>
                <MenuItem onClick={() => setGenre(12)}>Science-Opera</MenuItem>
                <MenuItem onClick={() => setGenre(13)}>Superhero</MenuItem>
              </Menu>
              <Button variant="contained" onClick={saveMovieChanges}>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPage;
