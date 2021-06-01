import User from '../models/user.js'

// * Users INDEX Route
export const getUserProfiles = async (_req, res) => {
  const userProfiles = await User.find()
  return res.status(200).json(userProfiles)
}

// * User SHOW Route
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('The music has stopped, there is an error!')
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// * User POST myList route
export const addToFavourites = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('Cannot find user')
    if (!user._id.equals(req.currentUser._id)) throw new Error('You cannot add this to favourites as you are unauthorized.')
    const newFavourites = { ...req.body }
    user.favourites.push(newFavourites)
    await user.save()
    return res.status(200).json(newFavourites)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}
