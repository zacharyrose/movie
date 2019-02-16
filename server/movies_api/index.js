'use strict'

const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

const genres = require('./routes/genres')
const movies = require('./routes/movies')

const app = express()

app.use(cors())

let moviesDB = new sqlite3.Database('./movies_api/db/movies.db', sqlite3.OPEN_READONLY, err => {
  if (err) {
    console.log('ERROR connecting to DB', err)
  } else {
    console.log('Connected to DB')
  }
})

app.get('/genres/all', genres.getAllGenres.bind(null, moviesDB))
app.get('/genres/:genreId', genres.getGenre.bind(null, moviesDB))
app.get('/heartbeat', (req, res) => res.send('Good luck with the code test!'))
app.get('/movies/all', movies.getAllMovies.bind(null, moviesDB))
app.get('/movies/search', movies.getMoviesByTitleSearch.bind(null, moviesDB))
app.get('/movies/:movieId', movies.getMovie.bind(null, moviesDB))
app.get('/movies/bygenre/:genreId', movies.getMoviesByGenre.bind(null, moviesDB))

app.listen(3001, () => console.log('App running on localhost:3001'))
