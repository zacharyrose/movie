'use strict'

const csv = require('csvtojson')
const sqlite3 = require('sqlite3').verbose()

const movies = 'movies_metadata_small.csv'
const dbPath = './movies.db'

let db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.log('error connecting to db', err)
  } else {
    console.log('connected')
  }
})

let createSql = 'CREATE TABLE movies (id INTEGER PRIMARY KEY, imdbId TEXT NOT NULL, title TEXT NOT NULL, overview TEXT, productionCompanies TEXT, releaseDate TEXT, budget INTEGER, revenue INTEGER, runtime REAL, language TEXT, genres TEXT, status TEXT)'
db.run(createSql)

csv()
  .fromFile(movies)
  .on('json', jsonObj => {
    let query = `INSERT INTO movies (id, imdbId, title, overview, productionCompanies, releaseDate, budget, revenue, runtime, language, genres, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    console.log(jsonObj.id, jsonObj.production_companies)
    let data = [
      parseInt(jsonObj.id),
      jsonObj.imdb_id,
      jsonObj.title,
      jsonObj.overview,
      jsonObj.production_companies === undefined ? '' : jsonObj.production_companies.replace(/\'/g, '"'),
      jsonObj.release_date,
      jsonObj.budget,
      jsonObj.revenue,
      jsonObj.runtime,
      jsonObj.language,
      jsonObj.genres.replace(/\'/g, '"'),
      jsonObj.status
    ]
    db.run(query, data, err => {
      if (err) {
        console.log('error inserting', err, jsonObj.id)
      }
    })
  })
  .on('done', error => {
    if (error) {
      console.log('error', error)
    } else {
      console.log('done')
    }
  })
