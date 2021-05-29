import { response } from 'express'
import Song from '../index.js'

// * INDEX
export const getAllSongs = async (_req, res) => {
  const songs = await Song.find()
  console.log('SONGS', songs)
  return res.status(200).json(shows)
}

// * CREATE
export const addSong = async (req, res) => {
  try {
    return res.status(201).json()
  } catch (err){
    console.log('Cannot add new song 🤨')
    console.log(err)
    return res.status(422).json(err)
  }
}

// * SHOW
export const getOneSong = async (req, res) => {
  try {
    const { id } = req.params
    const singleSong = await Song.findById(id).populate('owner').populate
    ('comments.owner')
    if (!singleSong){
      throw new Error('No song exists with that id 🤷🏻‍♀️')
    }
    console.log('SINGLE SONG', singleSong)
    return res.status(200).json(singleSong)
  } catch {
    console.log('Something went wrong 🧐')
    console.log(err)
    return res.status(404).json({ 'message': 'Not Found' })
  }
}

export default Song