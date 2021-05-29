import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/songs')
      setSongs(data)
    }
    getData()
  }, [])

  return (
    <>
      {songs.map(show => {
        return <h1 key={show._id}>{show.title}</h1>
      })}
    </>
  )
}
export default App
