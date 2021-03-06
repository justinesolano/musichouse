import Song from '../models/song.js'

// * INDEX
export const getAllSongs = async (_req, res) => {
  const songs = await Song.find()
  console.log('SONGS', songs)
  return res.status(200).json(songs)
}

// * CREATE
export const addSong = async (req, res) => {
  try {
    console.log('REQ CURRENT USER', req.currentUser)
    console.log('REQ BODY', req.body)

    const newSong = { ...req.body, owner: req.currentUser._id }
    console.log('NEW SONG', newSong)
    const songToAdd = await Song.create(newSong)

    return res.status(201).json(songToAdd)
  } catch (err){
    console.log('Cannot add new song ๐คจ')
    console.log(err)
    return res.status(422).json(err)
  }
}

// * SHOW
export const getOneSong = async (req, res) => {
  try {
    const { id } = req.params
    const singleSong = await Song.findById(id).populate('owner').populate('comments.owner')
    if (!singleSong){
      throw new Error('No song exists with that id ๐คท๐ปโโ๏ธ')
    }
    console.log('SINGLE SONG', singleSong)
    return res.status(200).json(singleSong)
  } catch {
    console.log('Something went wrong ๐ง')
    console.log(err)
    return res.status(404).json({ 'message': 'Not Found' })
  }
}

// * DELETE
export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params
    const songToDelete = await Song.findById(id)
    if (!songToDelete) throw new Error('That song is not currently in our database!')
    await songToDelete.remove()
    return res.status(204).json({ 'message': 'item deleted' })
  } catch(err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not Found' })
  }
}

// * UPDATE
export const updateSong = async (req, res) => {
  try {
    const { id } = req.params
    const songToUpdate = await Song.findById(id)
    if (!songToUpdate) throw new Error()
    Object.assign(songToUpdate, req.body)
    await songToUpdate.save()
    return res.status(202).json(songToUpdate)
  } catch (err){
    console.log(err)
    return res.status(404).json({ 'message': 'Not Found' })
  }
}

// * ADD COMMENT TO SONG
export const addCommentToSong = async (req, res)=> {
  try { 
    const { id } = req.params
    const song = await Song.findById(id)
    if (!song) throw new Error('Cannot find song ๐คท๐ปโโ๏ธ')
    const newComment = { ...req.body, owner: req.currentUser._id }
    song.comments.push(newComment)
    await song.save()
    return res.status(200).json(song)
  } catch (err) {
    console.log(err)
    return res.staus(404).json({ message: err.message })
  }
}

export const deleteCommentFromSong = async (req, res) => {
  try {
    const { id, commentId } = req.params
    const song = await Song.findById(id)
    if (!song) throw new Error('Song not found ๐ญ')
    const commentToDelete = song.comments.id(commentId)
    if (!commentToDelete) throw new Error('Comment not found')
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorized ๐๐ปโโ๏ธ')
    await commentToDelete.remove()
    await song.save()
    return res.status(204).json()
  } catch (err){
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// * POST Rating Route
export const addRatingToSong = async (req, res) => {
  try {
    const { id } = req.params
    const song = await  Song.findById(id)
    if (!song) throw new Error('Cannot find song!')
    const newRating = { ...req.body, owner: req.currentUser._id }
    song.ratings.push(newRating)
    await song.save()
    return res.status(200).json(song)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}