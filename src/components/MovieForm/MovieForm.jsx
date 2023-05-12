import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

// docx stuff
import { saveAs } from "file-saver";
const Docxtemplater = require("docxtemplater");
import templateContent from "./ShortFormTemplate.docx";
import JSZipUtils from "jszip-utils";
import JSZip from "jszip";

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


  // Test output for checked boxes
  console.log(`Yes \u2610 No \u2611 N/A \u2610`);

  const generateDocx = () => {
    // Create a new Docxtemplater instance
    const doc = new Docxtemplater();

    // Load the template asynchronously using JSZipUtils
    JSZipUtils.getBinaryContent(templateContent, (error, content) => {
      if (error) {
        throw new Error("Error loading template: " + error);
      }

      // Load the template content
      const zip = new JSZip(content);
      doc.loadZip(zip);

      // Define the data to be filled in the template
      const data = {
        hospitalName: "Ryan stinks",
        address: "Test Address",
        clinicianName: "Test Clinician",
        eventReportNumber: "12345",
        country: "united states"
      };

      // Bind the data to the template
      doc.setData(data);

      // Generate the document
      try {
        doc.render();
      } catch (error) {
        throw new Error("Error rendering template: " + error);
      }

      // Get the generated document as an ArrayBuffer
      const buffer = doc.getZip().generate({ type: "arraybuffer" });

      // Convert the ArrayBuffer to a Blob

      const generatedContent = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Save the generated document using file-saver
      const outputFileName = "output.docx";
      saveAs(generatedContent, outputFileName);

      console.log("Document created successfully");
    });
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

          <button onClick={() => generateDocx()}>Create PDF</button>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
