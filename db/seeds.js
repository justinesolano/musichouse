import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import songData from './data/songs.js'
import Song from '../models/song.js'
import User from '../models/user.js'
import userData from './data/users.js'


const seedDatabase = async () => {
  try {
    // * connect database
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('🥳 Database connected successfully')

    // * drop database
    await mongoose.connection.db.dropDatabase()
    console.log('💧 DB dropped')

    const users = await User.create(userData)
    console.log(`🙋🏻‍♀️ DB seeded with ${users.length} users`)

    const songsWithUsers = songData.map(song => {
      song.owner = users[0]._id
      return song
    })

    const songs = await Song.create(songsWithUsers)
    console.log(`🌱 DB seeded with ${songs.length} songs`)


    // * close connection
    await mongoose.connection.close()
    console.log('🤘🏼 Bye')

  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
    console.log('👋🏼 Bye')
  }
}
seedDatabase()