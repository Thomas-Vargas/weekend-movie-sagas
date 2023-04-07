import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const MovieForm = () => {
  const [newMovie, setNewMovie] = useState({title: '', poster: '', description: ''});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (keyToUpdate) => {
    setNewMovie({...newMovie, [keyToUpdate]: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('hello');
  };

  return (
    <div>
      <h2>Add a movie</h2>
      <form onSubmit={handleSubmit}>
        <TextField onChange={() => handleInputChange('title')} id="outlined-basic" label="Title" variant="outlined" />
        <TextField onChange={() => handleInputChange('poster')} id="outlined-basic" label="Image" variant="outlined" />
        <TextField onChange={() => handleInputChange('description')} id="outlined-basic" label="Description" variant="outlined" multiline />

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
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Adventure</MenuItem>
          <MenuItem onClick={handleClose}>Animated</MenuItem>
          <MenuItem onClick={handleClose}>Biographical</MenuItem>
          <MenuItem onClick={handleClose}>Comedy</MenuItem>
          <MenuItem onClick={handleClose}>Disaster</MenuItem>
          <MenuItem onClick={handleClose}>Drama</MenuItem>
          <MenuItem onClick={handleClose}>Epic</MenuItem>
          <MenuItem onClick={handleClose}>Fantasy</MenuItem>
          <MenuItem onClick={handleClose}>Musical</MenuItem>
          <MenuItem onClick={handleClose}>Romantic</MenuItem>
          <MenuItem onClick={handleClose}>Science Fiction</MenuItem>
          <MenuItem onClick={handleClose}>Science-Opera</MenuItem>
          <MenuItem onClick={handleClose}>Superhero</MenuItem>
        </Menu>
        <Button id="basic-button" type="submit" variant="contained">Submit</Button>
      </form>
    </div>
  );
};

export default MovieForm;
