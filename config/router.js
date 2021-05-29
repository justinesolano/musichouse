import express from 'express'
import { getAllSongs, getOneSong, addSong, deleteSong, updateSong, addCommentToSong, deleteCommentFromSong } from '../controllers/songs.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { getUserProfile } from '../controllers/users.js'
import { secureRoute } from '../config/secureRoute.js'

const router = express.Router()

router.route('/songs')
  .get(getAllSongs)
  .post(secureRoute, addSong)

router.route('/songs/:id')
  .get(getOneSong)
  .put(secureRoute, updateSong)
  .delete(secureRoute, deleteSong)

router.route('/songs/:id/comments')
  .post(secureRoute, addCommentToSong)

router.route('/songs/:id/comments/:commentId')
  .delete(secureRoute, deleteCommentFromSong)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/profile')
  .get(secureRoute, getUserProfile)

export default router