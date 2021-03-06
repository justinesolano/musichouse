import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'

const app = express()

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

    // * Run router
    app.use('/api', router)

    app.listen(process.env.PORT || 4000, () => console.log(`🥳 Express is up and running on port ${port}`))

  } catch (err){
    console.log('Something went wrong with starting the app 🧐')
    console.log(err)
  }
}
startServer()
