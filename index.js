import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'

const app = express()
// const port = 4000
// const dbURI = 'mongodb://localhost/musichouse'

app.use(express.json())

const musicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artists: { type: String, required: true },
  yearReleased: { type: String, required: true },
  album: { type: String, required: true },
  albumCover: { type: String, required: true },
  duration: { type: String, required: true },
})

const Song = mongoose.model('Song', musicSchema)

const startServer = async() => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('Database connected successfully 👏🏼')

    // * body parser
    app.use(express.json())

    app.listen(port, () => console.log(`🥳 Express is up and running on port ${port}`))

  } catch (err){
    console.log('Something went wrong with starting the app 🧐')
    console.log(err)
  }
}
startServer()
