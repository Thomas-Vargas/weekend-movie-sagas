const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// put request
router.put("/:id", (req, res) => {
  console.log(req.body);
  const updatedMovie = req.body;
  const queryText = `UPDATE movies SET title = $1, description = $2, poster = $3 WHERE id = ${req.params.id}`;

  pool
    .query(queryText, [
      updatedMovie.title,
      updatedMovie.description,
      updatedMovie.poster,
    ])
    .then((result) => {
      //console.log("result:", result);
      // how do i update only genre being changes?
      const updateMovieGenreQuery = `UPDATE movies_genres SET genre_id = $1 WHERE movie_id = ${req.params.id}`;

      pool
        .query(updateMovieGenreQuery, [req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log('error in second update request', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
  console.log("Id to get:", req.params.id);
  const queryText = `SELECT movies.title, movies.poster, movies.description, STRING_AGG (genres.name, ', ') AS genres FROM movies
  JOIN movies_genres on movies_genres.movie_id = movies.id
  JOIN genres on movies_genres.genre_id = genres.id
  WHERE movies.id = ${req.params.id}
  GROUP BY movies.title, movies.poster, movies.description;`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("New Movie Id:", result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
