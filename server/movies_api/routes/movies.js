'use strict'
var validator = require('validator');


module.exports = {
  getAllMovies: getAllMovies,
  getMovie: getMovie,
  getMoviesByGenre: getMoviesByGenre,
  getMoviesByTitleSearch: getMoviesByTitleSearch
}

function getAllMovies (db, req, res) {
  let query = 'SELECT * FROM movies LIMIT 100;'
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send(JSON.stringify(err))
    }

    if (rows.length === 0) {
      res.status(404)
    }

    res.send(rows)
  })
}
function getMovie (db, req, res) {
  let query = 'SELECT * FROM movies WHERE id = ?'
  db.all(query, req.params.movieId, (err, rows) => {
    if (err) {
      res.status(500).send(JSON.stringify(err))
    }

    if (rows.length === 0) {
      res.status(404)
    }

    res.send(rows)
  })
}

function getMoviesByGenre (db, req, res) {
  let query = `SELECT * FROM movies JOIN genres_movies ON movies.id = genres_movies.movie_id WHERE genres_movies.genre_id = ?;`;
  db.all(query, req.params.genreId, (err, rows) => {
    if (err) {
      res.status(500).send(JSON.stringify(err))
    }

    if (rows.length === 0) {
      res.status(404)
    }

    res.send(rows)
  })
}

function getMoviesByTitleSearch (db, req, res) {
  let searchTerm = validator.whitelist(req.query.s, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890-');
  let query = `SELECT * FROM movies WHERE title LIKE ?;`;
  db.all(query, `%${searchTerm}%`, (err, rows) => {
    if (err) {
      res.status(500).send(JSON.stringify(err))
    }

    if (rows.length === 0) {
      res.status(404)
    }

    res.send(rows)
  })
}