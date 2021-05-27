import express from 'express'
import mongoose from mongoose

const app = express()
const port = 4000
const dbURI = 'mongodb://localhost/musichouse'

const startServer = async() => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('Database connected successfully 👏🏼')

    app.listen(port, () => console.log(`🥳 Express is up and running on port ${port}`))

  } catch (err){
    console.log('Something went wrong with starting the app 🧐')
    console.log(err)
  }
}
startServer()
