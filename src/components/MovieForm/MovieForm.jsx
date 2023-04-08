import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const MovieForm = () => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    poster: "",
    description: "",
    genre_id: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const setGenre = (genreId) => {
    setNewMovie({ ...newMovie, genre_id: genreId });
    // console.log(newMovie);
    setAnchorEl(null);
  };

  const handleInputChange = (keyToUpdate) => {
    setNewMovie({ ...newMovie, [keyToUpdate]: event.target.value });
    // console.log(newMovie);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "POST_NEW_MOVIE", payload: newMovie });
  };

  return (
    <div>
      <h1>Add a movie</h1>
      <form className="add-movie-form" onSubmit={handleSubmit}>
        <div className="add-movie-inputs">
          <TextField
            onChange={() => handleInputChange("title")}
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <TextField
            onChange={() => handleInputChange("poster")}
            id="outlined-basic"
            label="Image"
            variant="outlined"
          />
          <TextField
            onChange={() => handleInputChange("description")}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
          />
        </div>

        <div className="add-movie-buttons">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
          >
            Genres
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
            <MenuItem onClick={() => setGenre(11)}>Science Fiction</MenuItem>
            <MenuItem onClick={() => setGenre(12)}>Science-Opera</MenuItem>
            <MenuItem onClick={() => setGenre(13)}>Superhero</MenuItem>
          </Menu>
          <Button id="basic-button" type="submit" variant="contained">
            Submit
          </Button>
          <Button
            id="basic-button"
            onClick={() => history.push("/")}
            variant="contained"
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* TODO
        - display success image/alert when submit happens
        - Display the category selected by user
      */}
    </div>
  );
};

export default MovieForm;
