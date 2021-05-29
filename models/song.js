import mongoose from 'mongoose'

// * Schema for the comments
const commentsSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId , ref: 'User', required: true },
}, {
  timestamps: true,
})

const musicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artists: { type: String, required: true },
  yearReleased: { type: String, required: true },
  album: { type: String, required: true },
  albumCover: { type: String, required: true },
  duration: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentsSchema],
})

// * Calculate avg rating
musicSchema
  .virtual('avgRating')
  .get(function(){
    if (!this.comments.length) return 'Not yet rated'
    const sum = this.comments.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0)
    return sum / this.comments.length
  })


export default mongoose.model('Song', musicSchema)