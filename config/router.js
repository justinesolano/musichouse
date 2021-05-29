import express from 'express'
import { getAllSongs, getOneSong, deleteSong, updateSong, addCommentToSong } from '../controllers/shows.js'

import { registerUser } from '../controllers/auth.js'
// import { secureRoute } from '.secureRoute.js'

const router = express.Router()

router.route('/songs')
  .get(getAllSongs)
  .post(addSong)



router.route('/register')
  .post(registerUser)

  export default router