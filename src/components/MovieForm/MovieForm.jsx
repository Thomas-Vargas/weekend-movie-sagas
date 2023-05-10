import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

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

  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState();

  const submitImage = async (event) => {
    event.preventDefault();

    // Send the file and description to the server
    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    const result = await axios.post("/api/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(result.data);
    setImageName(result.data);
  };

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

      <div className="multer">
        <div className="App">
          <form onSubmit={submitImage}>
            <input
              filename={file}
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            ></input>
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            ></input>
            <button type="submit">Submit</button>
          </form>
          {imageName && (
            <div>
              <h3>Uploaded Image:</h3>
              <img style={{ height: "600px" }} src={imageName} alt="Uploaded" />
            </div>
          )}
          <div>
            <img
              style={{ height: "600px" }}
              src="https://aws-spike.s3.amazonaws.com/1683733509662"
              alt="Uploaded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
