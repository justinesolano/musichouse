import mongoose from 'mongoose'



const musicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artists: { type: String, required: true },
  yearReleased: { type: String, required: true },
  album: { type: String, required: true },
  albumCover: { type: String, required: true },
  duration: { type: String, required: true },
})


export default mongoose.model('Song', musicSchema)