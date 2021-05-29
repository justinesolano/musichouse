import User from '../models/user.js'

export const getUserProfile = async (req, res) => {
  try {
    const user = await (await User.findById(req.currentUser._id)).populate('createdSongs')
    if (!user) throw new Error('User not found 🤷🏻‍♀️')
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}