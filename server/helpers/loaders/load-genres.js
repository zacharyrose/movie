'use strict'

const sqlite3 = require('sqlite3').verbose()
const request = require('request')

const dbPath = './movies.db'

let db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.log('error connecting to db', err)
  } else {
    console.log('connected')
  }
})

// let createGenresTable = `CREATE TABLE IF NOT EXISTS genres (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, UNIQUE(id));`;
// let createGenresMoviesTable = `CREATE TABLE IF NOT EXISTS genres_movies (genre_id INTEGER NOT NULL, movie_id INTEGER NOT NULL, UNIQUE(genre_id, movie_id));`;

// db.run(createGenresTable);
// db.run(createGenresMoviesTable);

const getAllMovies = 'SELECT * FROM movies;';
// db.all(getAllMovies, [], (err, movies) => {
//   if (err) {
//     res.status(500).send(JSON.stringify(err));
//   }

//   if (movies.length === 0) {
//     res.status(404);
//   }

//   for (var movie of movies) {


//     const genres = JSON.parse(movie.genres);
//     const movieId = movie.id;
//     for (const genre of genres) {
//       console.log(genre)
//       const insertGenreMoviePair = `INSERT OR IGNORE INTO genres_movies(genre_id, movie_id) VALUES(?, ?);`;
//       const genreMoviePair = [genre.id, movieId];
//       db.run(insertGenreMoviePair, genreMoviePair, err => {
//         if (err) {
//           console.log('error inserting', err);
//         }
//       })

//       const insertGenre = `INSERT OR IGNORE INTO genres(id, name) VALUES(?, ?);`;
//       const data = [genre.id, genre.name];
//       db.run(insertGenre, data, err => {
//         if (err) {
//           console.log('error inserting', err);
//         }
//       })
//     }
//   }
// })


// const createTempMoviesTable = `CREATE TABLE IF NOT EXISTS temp_movies (id INTEGER PRIMARY KEY, title TEXT NOT NULL, releaseDate TEXT, imdbId TEXT);`;
// const copyOldMoviesTable = `INSERT INTO temp_movies SELECT id, title, releaseDate, imdbId FROM movies;`;
// const addPosterColumn = `ALTER TABLE temp_movies ADD COLUMN poster TEXT;`
// const dropOldMoviesTable = `DROP TABLE IF EXISTS movies;`;
// const renameTempMoviesTable = `ALTER TABLE temp_movies RENAME TO movies;`;
// db.serialize(function () {
//   db.run(createTempMoviesTable);
//   db.run(copyOldMoviesTable);
//   db.run(addPosterColumn);
//   db.run(dropOldMoviesTable);
//   db.run(renameTempMoviesTable);

// });


db.all(getAllMovies, [], (err, movies) => {
  if (err) {
    res.status(500).send(JSON.stringify(err));
  }

  if (movies.length === 0) {
    res.status(404);
  }

  for (var movie of movies) {
    request(`http://www.omdbapi.com/?i=${movie.imdbId}&apikey=147c18a9`, function (err, res, body) {
      if (err) {
        console.log('error:', error);
        console.log('statusCode:', res && res.statusCode);
      }

      const updatePoster = `UPDATE movies SET poster = ? WHERE id = ?;`;
      const poster = JSON.parse(body).Poster;
      const data = [poster, this.movieId];
      console.log(data);
      db.run(updatePoster, data, err => {
        if (err) {
          console.log('error inserting', err);
        }
      })

    }.bind({movieId:movie.id}));
  }
})
