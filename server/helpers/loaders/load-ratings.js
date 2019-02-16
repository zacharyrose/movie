'use strict'
const csv = require('csvtojson')
const sqlite3 = require('sqlite3').verbose()

const csvFile = 'ratings_small.csv'
const dbPath = '../api/db/ratings.db'

let db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.log('error connecting to db', err)
  } else {
    console.log('connected')
  }
})

let id = 0

csv()
  .fromFile(csvFile)
  .on('json', jsonObj => {
    id += 1
    let query = `INSERT INTO ratings (ratingId, userId, movieId, rating, timestamp) VALUES (?, ?, ?, ?, ?)`
    db.run(query, [id, jsonObj.userId, jsonObj.movieId, jsonObj.rating, jsonObj.timestamp], err => {
      if (err) {
        console.log('error inserting', err, jsonObj)
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
