'use strict'

module.exports = {
  getAllGenres: getAllGenres,
  getGenre: getGenre
}

function getAllGenres (db, req, res) {
  let query = 'SELECT * FROM genres LIMIT 100;'
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
function getGenre (db, req, res) {
  let query = 'SELECT * FROM genres WHERE id = ?'
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
