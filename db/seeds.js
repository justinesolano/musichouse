import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'


const seedDatabase = async () => {
  try {
    // * connect database
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } )
    console.log('🥳 Database connected successfully')

    // * drop database
    await mongoose.connection.db.dropDatabase()
    console.log('🚨 DB dropped')

    // * close connection
    await mongoose.connection.close()
    console.log('👋🏼  Bye')

  } catch (err) {
    console.log(err)
  }
}
seedDatabase()