import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'

const app = express()
// const port = 4000
// const dbURI = 'mongodb://localhost/musichouse'
import router from './config/router.js'

app.use(express.json())

const startServer = async() => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('Database connected successfully 👏🏼')

    // * body parser
    app.use(express.json())

    app.use((req, _res, next) => {
      console.log(`Incoming request: ${req.method} - ${req.url}`)
      next()
    })

    app.use('/api', router)

    app.listen(port, () => console.log(`🥳 Express is up and running on port ${port}`))

  } catch (err){
    console.log('Something went wrong with starting the app 🧐')
    console.log(err)
  }
}
startServer()
